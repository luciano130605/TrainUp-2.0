import { useEffect, useRef, useState } from "react";
import type { Tab } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { bindGymPersist, persistNow, useTrain } from "@/lib/store";
import { AppShell } from "@/components/app-shell";
import { Splash } from "@/components/splash";
import { Onboarding } from "@/components/onboarding";
import { TabBar } from "@/components/tab-bar";
import { HomeView } from "@/components/views/home";
import { TrainView } from "@/components/views/train";
import { CreateView } from "@/components/views/create";
import { SessionView } from "@/components/views/session";
import { ProgressView } from "@/components/views/progress";
import { ProfileView } from "@/components/views/profile";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { loadGymState, saveGymState } from "@/lib/data";
import { applyTheme } from "@/lib/theme";
import { setVibrationEnabled } from "@/lib/audio";
import { applyLowPowerClass } from "@/lib/low-power";
import { fireWorkoutNotice, msUntilHour, routinesForToday } from "@/lib/notify";

export const Route = createFileRoute("/")({ component: Home });

/** Hard cap so a wedged storage read can never leave the splash up forever. */
const REHYDRATE_TIMEOUT_MS = 3000;

/**
 * Resolve once zustand persist has finished reading storage (or has given up).
 *
 * `persist.rehydrate()` returns before the state is actually applied — it
 * resolves as soon as the storage read is kicked off — so waiting on it alone
 * still lets the first client write clobber what was saved. `onFinishHydration`
 * fires on the real completion.
 */
function waitForRehydration(): Promise<void> {
  if (useTrain.persist.hasHydrated()) return Promise.resolve();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      unsubscribe();
      resolve();
    };
    const timer = window.setTimeout(finish, REHYDRATE_TIMEOUT_MS);
    const unsubscribe = useTrain.persist.onFinishHydration(finish);
    // Re-check: hydration may have completed between the guard and subscribe.
    if (useTrain.persist.hasHydrated()) finish();
  });
}

function Home() {
  const hydrated = useTrain((s) => s.hydrated);
  const onboarded = useTrain((s) => s.profile.onboarded);
  const session = useTrain((s) => s.session);
  const tab = useTrain((s) => s.tab);
  const setTab = useTrain((s) => s.setTab);
  const skipRest = useTrain((s) => s.skipRest);
  const { user, isPending } = useCurrentUserState();
  // Only the id is a dependency: `useCurrentUserState()` hands back a NEW user
  // object on every render (real sessions included), so depending on `user`
  // re-ran the hydration effect on every render — and whichever branch it took
  // (markHydrated / hydrateRemote / beginFreshAccount) calls setState, which is
  // the "Maximum update depth exceeded" loop. The id string is stable.
  const userId = user?.id ?? null;
  const loadedFor = useRef<string | null>(null);
  // The persisted store rehydrates asynchronously. Mounting UI that WRITES to
  // the store before that finishes makes zustand persist flush its initial
  // (empty) state over the saved one — which wiped returning athletes back to
  // onboarding. So we hold the shell until rehydration reports done, with a
  // time cap only as a last-resort escape hatch.
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    applyLowPowerClass();
    bindGymPersist((snap) => saveGymState({ data: snap }));
  }, []);

  useEffect(() => {
    let alive = true;
    void (async () => {
      // The zustand persist pass only needs to happen once per page load; the
      // `loadedFor` guard alone would not stop it, since it runs before the
      // guard below.
      if (loadedFor.current === null) {
        try {
          // Await the REAL rehydration, not just the sync kick-off: until it
          // resolves, zustand persist will overwrite storage with the initial
          // state on the next write.
          await Promise.resolve(useTrain.persist.rehydrate());
          await waitForRehydration();
        } catch {
          /* empty store is fine */
        }
      }
      if (!alive) return;
      setRehydrated(true);
      const local = useTrain.getState();
      applyTheme(local.settings.theme);
      setVibrationEnabled(local.settings.vibration);
      const rest = local.session?.restUntil;
      if (rest && rest < Date.now()) skipRest();
      if (!userId || loadedFor.current !== null) {
        // Signed out, or this account is already loaded: nothing remote to fetch.
        useTrain.getState().markHydrated();
        return;
      }
      // Mark BEFORE awaiting: a re-run while the fetch is in flight must not
      // start a second one.
      loadedFor.current = userId;
      try {
        const remote = await loadGymState();
        if (!alive) return;
        if (remote?.profile.onboarded) {
          // The account has server-side data: it wins.
          useTrain.getState().hydrateRemote(remote);
        } else if (useTrain.getState().profile.onboarded) {
          // Nothing on the server, but this device has a finished setup. Keep
          // it and push it up rather than wiping it — a returning athlete must
          // never be thrown back into onboarding by an empty server row.
          useTrain.getState().markHydrated();
          void persistNow();
        } else {
          useTrain.getState().beginFreshAccount();
        }
      } catch {
        if (alive) useTrain.getState().markHydrated();
      }
    })();
    return () => {
      alive = false;
    };
  }, [skipRest, userId]);

  useEffect(() => {
    const settings = useTrain.getState().settings;
    if (!settings.notifications || typeof window === "undefined") return;
    const wait = msUntilHour(settings.notifyHour);
    const id = window.setTimeout(() => {
      const s = useTrain.getState();
      if (!s.settings.notifications) return;
      const due = routinesForToday(s.customRoutines);
      const name = due[0]?.name ?? "tu sesión de hoy";
      fireWorkoutNotice("TrainUp", `Hoy toca ${name}`);
    }, wait);
    return () => window.clearTimeout(id);
  }, [userId, onboarded]);

  if (isPending) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg">
        <Splash />
      </div>
    );
  }

  if (!user) return <RedirectToSignIn />;

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg">
        <Splash />
      </div>
    );
  }

  const showNav = onboarded && !session;
  const activeTab: Tab = onboarded ? tab : "home";

  return (
    <AppShell tab={activeTab} onChange={setTab} showNav={showNav}>
      {!rehydrated ? (
        <div className="flex min-h-dvh flex-1 items-center justify-center bg-bg">
          <Splash />
        </div>
      ) : !onboarded ? (
        <Onboarding />
      ) : session ? (
        <div className="flex min-h-dvh flex-1 flex-col">
          <SessionView />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <main className="mx-auto min-h-0 w-full max-w-xl flex-1 overflow-y-auto px-5 pt-8 pb-6 safe-top tab-bar-pad lg:max-w-2xl lg:pb-8 lg:pt-10">
            {tab === "home" ? <HomeView /> : null}
            {tab === "train" ? <TrainView /> : null}
            {tab === "create" ? <CreateView /> : null}
            {tab === "progress" ? <ProgressView /> : null}
            {tab === "profile" ? <ProfileView /> : null}
          </main>
          <TabBar tab={activeTab} onChange={setTab} className="lg:hidden" />
        </div>
      )}
    </AppShell>
  );
}

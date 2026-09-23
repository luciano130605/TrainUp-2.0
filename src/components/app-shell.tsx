import type { ReactNode } from "react";
import { TAB_ITEMS } from "./tab-bar";
import type { Tab } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Mark } from "./mark";

export function AppShell({
  children,
  tab,
  onChange,
  sidebarExtra,
  showNav,
}: {
  children: ReactNode;
  tab: Tab;
  onChange: (tab: Tab) => void;
  sidebarExtra?: ReactNode;
  showNav: boolean;
}) {
  return (
    <div className="min-h-dvh bg-chassis text-fg">
      <div className="mx-auto flex min-h-dvh max-w-6xl">
        {showNav ? (
          <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-bg px-3 py-6 lg:flex">
            <div className="flex items-center gap-2 px-2">
              <Mark />
              <span className="font-display text-2xl tracking-tight">GymUp</span>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {TAB_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange(item.id)}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium pressable",
                      active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg",
                    )}
                  >
                    <Icon className="size-4" strokeWidth={active ? 2.4 : 1.8} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            {sidebarExtra ? <div className="mt-auto px-1">{sidebarExtra}</div> : null}
          </aside>
        ) : null}

        <div className="relative flex min-h-dvh min-w-0 flex-1 flex-col bg-bg">
          {children}
        </div>
      </div>
    </div>
  );
}

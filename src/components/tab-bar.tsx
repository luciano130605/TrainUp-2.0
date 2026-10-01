import type { Tab } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useKeyboardOpen } from "@/lib/keyboard";
import { AddFillIcon, AddIcon, HomeFillIcon, HomeIcon, ProgressFillIcon, ProgressIcon, RunFillIcon, RunIcon, UserFillIcon, UserIcon } from "./ui/icons";

type TabIcon = typeof HomeIcon;

export const TAB_ITEMS: {
  id: Tab;
  label: string;
  icon: TabIcon;
  iconFill?: TabIcon;
}[] = [
    { id: "home", label: "Inicio", icon: HomeIcon, iconFill: HomeFillIcon },
    { id: "train", label: "Entrenar", icon: RunIcon, iconFill: RunFillIcon },
    { id: "create", label: "Crear", icon: AddIcon, iconFill: AddFillIcon },
    { id: "progress", label: "Progreso", icon: ProgressIcon, iconFill: ProgressFillIcon },
    { id: "profile", label: "Yo", icon: UserIcon, iconFill: UserFillIcon },
  ];

export function TabBar({
  tab,
  onChange,
  className,
}: {
  tab: Tab;
  onChange: (tab: Tab) => void;
  className?: string;
}) {
  const typing = useKeyboardOpen();

  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        "tab-bar-fixed z-50 shrink-0 border-t border-line bg-surface/95 px-2 pt-1 shadow-[0_-16px_32px_rgb(0_0_0_/_0.18)] backdrop-blur transition-transform duration-200",
        typing && "pointer-events-none translate-y-full",
        className,
      )}
    >
      <ul className="grid grid-cols-5">
        {TAB_ITEMS.map((item) => {
          const active = tab === item.id;

          const Icon = active
            ? (item.iconFill ?? item.icon)
            : item.icon;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onChange(item.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex h-16 w-full flex-col items-center justify-center gap-0.5 rounded-xl pressable transition-colors",
                  active ? "text-accent" : "text-muted",
                )}
              >
                {/* The active pill slides in behind the icon, so switching tabs
                    reads as one moving surface instead of five blinking ones. */}
                <span
                  aria-hidden
                  className={cn(
                    "grid h-8 w-12 place-items-center rounded-full transition-all duration-300",
                    active ? "scale-100 bg-accent/15" : "scale-90 bg-transparent",
                  )}
                >
                  <Icon className="size-[22px]" />
                </span>

                <span
                  className={cn(
                    "text-[10px] tracking-wide transition-transform duration-300",
                    active ? "font-semibold -translate-y-px" : "font-medium",
                  )}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
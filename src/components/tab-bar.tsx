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
                  "flex h-14 w-full flex-col items-center justify-center gap-1 rounded-xl pressable",
                  active ? "text-accent" : "text-muted",
                )}
              >
                <Icon className="size-[22px]" />

                <span className={cn("text-[10px] tracking-wide", active ? "font-semibold" : "font-medium")}>
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "h-0.5 w-5 rounded-full transition-opacity",
                    active ? "bg-accent opacity-100" : "opacity-0",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
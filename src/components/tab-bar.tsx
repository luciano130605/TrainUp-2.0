import { Activity, CirclePlus, Dumbbell, House, PlusSquare, User } from "lucide-react";
import type { Tab } from "@/lib/types";
import { cn } from "@/lib/utils";

export const TAB_ITEMS: { id: Tab; label: string; icon: typeof House }[] = [
  { id: "home", label: "Inicio", icon: House },
  { id: "train", label: "Entrenar", icon: Dumbbell },
  { id: "create", label: "Crear", icon: CirclePlus },
  { id: "progress", label: "Progreso", icon: Activity },
  { id: "profile", label: "Yo", icon: User },
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
  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 shrink-0 border-t border-line bg-surface/95 px-2 pt-1 pb-1 shadow-[0_-16px_32px_rgb(0_0_0_/_0.18)] backdrop-blur safe-bottom",
        className,
      )}
    >
      <ul className="grid grid-cols-5">
        {TAB_ITEMS.map((item) => {
          const active = tab === item.id;
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onChange(item.id)}
                className={cn(
                  "flex h-13 w-full flex-col items-center justify-center gap-0.5 rounded-md pressable",
                  active ? "text-accent" : "text-muted",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.4 : 1.8} />
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

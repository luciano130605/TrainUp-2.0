import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onCheckedChange,
  className,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  className?: string;
}) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "relative h-8 w-[3.75rem] shrink-0 rounded-full bg-elevated shadow-[var(--shadow-border)]",
        "transition-colors duration-200",
        "data-[state=checked]:bg-accent",
        className,
      )}
    >
      <SwitchPrimitive.Thumb className="block size-6 translate-x-1 rounded-full bg-fg shadow-[0_1px_2px_rgb(0_0_0_/_0.35)] transition-transform duration-200 ease-[var(--ease-out-smooth)] data-[state=checked]:translate-x-[2.1rem] data-[state=checked]:bg-accent-fg" />
    </SwitchPrimitive.Root>
  );
}

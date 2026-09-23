import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-end gap-0.5", className)} aria-hidden>
      <span className="w-1.5 rounded-sm bg-fg/40 h-2.5" />
      <span className="w-1.5 rounded-sm bg-fg/70 h-4" />
      <span className="w-1.5 rounded-sm bg-accent h-6" />
    </span>
  );
}

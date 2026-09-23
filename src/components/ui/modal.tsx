import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/**
 * Bottom-sheet dialog — the same shape the session screen already uses for its
 * rest timer and confirm prompts, lifted into a reusable component.
 *
 * It renders through a portal so a sheet opened from inside the scrolling
 * `<main>` covers the whole viewport instead of being clipped by it, and it
 * closes on backdrop tap / Escape. Body scroll is locked while open, which is
 * what makes it feel native on a phone.
 */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-bg/75 backdrop-blur-[2px] sm:items-center"
      onMouseDown={(e) => {
        // Only a tap on the backdrop itself closes — not a drag out of a control.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "flex max-h-[88dvh] w-full flex-col rounded-t-2xl bg-surface shadow-[var(--shadow-border-hover)]",
          "safe-bottom sm:max-w-md sm:rounded-2xl",
          className,
        )}
      >
        {title ? (
          <header className="flex items-start justify-between gap-3 border-b border-line px-5 pb-3 pt-5">
            <div className="min-w-0">
              <h2 className="truncate font-display text-3xl leading-none tracking-tight">
                {title}
              </h2>
              {subtitle ? <p className="mt-1.5 text-sm text-muted">{subtitle}</p> : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="-mr-1 flex size-10 shrink-0 items-center justify-center rounded-lg text-muted pressable"
            >
              <X className="size-5" />
            </button>
          </header>
        ) : (
          // Grab handle — the visual cue that this sheet is dismissable.
          <div className="flex justify-center pt-3">
            <span className="h-1 w-10 rounded-full bg-line-strong" />
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {footer ? <div className="border-t border-line px-5 py-4">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

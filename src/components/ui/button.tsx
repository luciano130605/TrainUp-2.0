import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium select-none pressable disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg",
        secondary: "bg-elevated text-fg shadow-[var(--shadow-border)]",
        ghost: "bg-transparent text-fg",
        danger: "bg-danger text-fg",
      },
      size: {
        sm: "h-10 px-3.5 text-sm rounded-md",
        md: "h-12 px-4 text-sm rounded-lg",
        lg: "h-14 px-5 text-base rounded-xl",
        icon: "size-11 rounded-lg",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, block, ...props }: Props) {
  return (
    <button className={cn(buttonVariants({ variant, size, block }), className)} {...props} />
  );
}

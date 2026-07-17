import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ute-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ute-gold text-ute-bg hover:opacity-90 active:scale-[0.98]",
        secondary: "bg-ute-surface-hi text-ute-text border border-ute-border hover:border-ute-gold/40 hover:text-ute-gold",
        outline: "border border-ute-gold/40 bg-transparent text-ute-text hover:bg-ute-gold/10 hover:border-ute-gold",
        ghost: "bg-transparent text-ute-text hover:bg-ute-surface-hi",
        electric: "bg-ute-electric/10 text-ute-electric border border-ute-electric/30 hover:bg-ute-electric/20",
        destructive: "bg-red-900/20 text-red-400 border border-red-800/40 hover:bg-red-900/40",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };

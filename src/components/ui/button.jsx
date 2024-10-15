/* eslint-disable react-refresh/only-export-components */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-primary-foreground hover:bg-green-600/90",
        active:
          "bg-accent text-slate-900 font-inter text-[20px] font-bold leading-[28px] tracking-[-0.1px] justify-start",
        plain:
          "text-slate-900 font-inter text-[20px] font-medium leading-[28px] tracking-[-0.1px] justify-start",
        accountInfo:
          "w-10 h-10 bg-gray-300 rounded-full mr-12",
        accManagement: 
          "w-full rounded-lg text-gray-700 font-semibold hover:bg-gray-100 flex items-center justify-start pl-0",

        white: "bg-white text-black border border-gray-500 hover:bg-gray-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

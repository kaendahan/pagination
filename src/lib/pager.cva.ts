import { VariantProps, cva } from "class-variance-authority";

const pagerCVA = cva(
  [
    "relative focus:z-20",
    "inline-flex items-center justify-center",
    "ring-inset ring-gray-subtle focus:outline-offset-0",
    "bg-white hover:bg-primary-light",
    "font-semibold text-gray hover:text-primary",
    "disabled:opacity-40 disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: ["h-8 w-8 p-2", "text-xs"],
        md: ["h-9 w-9 p-2", "text-sm"],
        lg: ["h-12 w-12 p-2", "text-base"],
      },
      variant: {
        ghost: "ring-0",
        bordered: "ring-1",
        "bordered-group": "ring-1",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-md",
        "rounded-md": "rounded-md",
        "rounded-lg": "rounded-lg",
        square: "rounded-none",
        prev: "rounded-l",
        "prev-md": "rounded-l-md",
        "prev-lg": "rounded-l-lg",
        "prev-full": "rounded-l-full",
        next: "rounded-r",
        "next-md": "rounded-r-md",
        "next-lg": "rounded-r-lg",
        "next-full": "rounded-r-full",
      },
      active: {
        true: [
          "z-10",
          "ring-primary",
          "bg-primary hover:bg-primary",
          "text-primary-emphasis hover:text-primary-emphasis",
        ],
      },
    },
    defaultVariants: {
      size: "md",
      shape: "square",
      variant: "bordered",
    },
  }
);

export const pagerSimpleCVA = cva(
  [
    "relative focus:z-20",
    "inline-flex items-center justify-center",
    "ring-inset ring-gray-subtle focus:outline-offset-0",
    "bg-white",
    "font-semibold text-gray",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: ["h-8 w-min-8 p-2", "text-xs"],
        md: ["h-9 w-min-9 p-2", "text-sm"],
        lg: ["h-12 w-min-12 p-2", "text-base"],
      },
      variant: {
        ghost: "ring-0",
        bordered: "ring-1",
        "bordered-group": "ring-1",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-md",
        "rounded-md": "rounded-md",
        "rounded-lg": "rounded-lg",
        square: "rounded-none",
        prev: "rounded-l",
        "prev-md": "rounded-l-md",
        "prev-lg": "rounded-l-lg",
        "prev-full": "rounded-l-full",
        next: "rounded-r",
        "next-md": "rounded-r-md",
        "next-lg": "rounded-r-lg",
        "next-full": "rounded-r-full",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "square",
      variant: "bordered",
    },
  }
);

export type PagerVariantProps = VariantProps<typeof pagerCVA>;
export type PagerSimpleVariantProps = VariantProps<typeof pagerSimpleCVA>;

export default pagerCVA;

import { VariantProps, cva } from "class-variance-authority";

const paginationCVA = cva(["isolate inline-flex"], {
  variants: {
    variant: {
      ghost: "gap-x-0.5",
      bordered: "gap-x-0.5",
      "bordered-group": "-space-x-px",
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
});

export type PaginationVariantProps = VariantProps<typeof paginationCVA>;

export default paginationCVA;

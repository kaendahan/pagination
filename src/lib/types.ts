import { ReactNode } from "react";
import { PaginationVariantProps } from "./pagination.cva";

type TSize = "sm" | "md" | "lg";
type TShape = "circle" | "rounded" | "rounded-md" | "rounded-lg" | "square";

interface IPaginationBaseProps extends PaginationVariantProps {
  disabled?: boolean;
  size?: TSize;
  shape?: TShape;  
  className?: string;

  total?: number;
  current?: number;
  pageSize?: number;
  onChangePage?: (page: number, pageSize: number) => void;

  itemRender?: (
    page: number,
    type: "page" | "prev" | "next" | "skip-prev" | "skip-next",
    element: ReactNode
  ) => ReactNode;
}

export type { TSize, TShape, IPaginationBaseProps };

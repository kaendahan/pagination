import { HTMLAttributes, KeyboardEvent, MouseEvent, forwardRef } from "react";
import { classNames, noop } from "./utils";
import pagerCVA, { PagerVariantProps } from "./pager.cva";

export interface PagerProps
  extends HTMLAttributes<HTMLButtonElement>,
    PagerVariantProps {
  page?: number;
  active?: boolean;
  disabled?: boolean;
  onPageClick?: (page: number) => void;
  onPageKeyDown?: (
    event: KeyboardEvent<HTMLButtonElement>,
    callback: (...args: any) => void,
    ...restParams: any
  ) => void;
}

const Pager = forwardRef<HTMLButtonElement, PagerProps>(
  (
    {
      children,
      className,
      variant,
      active,
      shape,
      size,
      page = -1,
      onClick = noop,
      onPageClick = noop,
      onKeyDown = noop,
      onPageKeyDown = noop,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (active) return;
      if (page >= 0) {
        onPageClick(page);
      } else {
        onClick(e);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (active) return;
      if (page >= 0) {
        onPageKeyDown(e, onPageClick, page);
      } else {
        onKeyDown(e);
      }
    };

    return (
      <button
        role="button"
        {...props}
        className={classNames(
          pagerCVA({ active, variant, size, shape, className })
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={ref}
      >
        {children ? children : page}
      </button>
    );
  }
);

export default Pager;

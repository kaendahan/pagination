import { FC } from "react";
import { PagerProps } from "./Pager";
import { classNames } from "./utils";
import { pagerSimpleCVA } from "./pager.cva";

export interface PagerSimpleProps extends PagerProps {
  text: string;
}

const PagerSimple: FC<PagerSimpleProps> = ({
  variant,
  size,
  shape,
  className,
  text,
}) => {
  return (
    <span
      className={classNames(
        pagerSimpleCVA({ variant, size, shape, className })
      )}
    >
      {text}
    </span>
  );
};

export default PagerSimple;

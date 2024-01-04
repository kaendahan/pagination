import { FC, useMemo } from "react";
import PagerSimple, { PagerSimpleProps } from "./PagerSimple";
import usePagination from "./usePagination";
import { calculatePage, classNames, noop } from "./utils";
import PagerJump, { PagerJumpProps } from "./PagerJump";
import paginationCVA from "./pagination.cva";
import { IPaginationBaseProps } from "./types";

const PaginationSimple: FC<IPaginationBaseProps> = ({
  disabled = false,
  size = "md",
  shape = "rounded",
  variant = "bordered",
  className,

  total = 0,
  current: currentProp = 1,
  pageSize: pageSizeProps = 10,
  onChangePage = noop,
}) => {
  const _className = classNames(
    paginationCVA({ variant: variant as any, className })
  );
  const isBorderedGroup = variant === "bordered-group";
  const pageShape = isBorderedGroup ? "square" : shape;

  const { createEventJumpPage, current, pageSize } = usePagination({
    current: currentProp,
    disabled,
    pageSize: pageSizeProps,
    total,
    onChangePage,
  });

  const { pagerSimple, pagerPrev, pagerNext } = useMemo(() => {
    const allPages = calculatePage(undefined, pageSize, total);

    const hasPrev = current > 1;
    const hasNext = current < allPages;

    const pagerSimpleProps: PagerSimpleProps = {
      variant: variant as any,
      shape: pageShape as any,
      size: size as any,
      text: `${current}/${allPages}`,
    };

    const pagerSimple = <PagerSimple {...pagerSimpleProps} />;

    const pagerJumpProps: Omit<PagerJumpProps, "jump"> = {
      variant: variant as any,
      shape: shape as any,
      size: size as any,
      isBorderedGroup,
    };

    const prevDisabled = !hasPrev || !allPages;
    const eventPrevPage = createEventJumpPage({
      jump: "prev",
      hasJump: !prevDisabled,
    });
    const pagerPrev = (
      <PagerJump
        {...pagerJumpProps}
        jump="prev"
        disabled={prevDisabled}
        onClick={eventPrevPage.onClick}
        onKeyDown={eventPrevPage.onKeyDown}
      />
    );

    const nextDisabled = !hasNext;
    const eventNextPage = createEventJumpPage({
      jump: "next",
      hasJump: !nextDisabled,
    });
    const pagerNext = (
      <PagerJump
        {...pagerJumpProps}
        jump="next"
        disabled={nextDisabled}
        onClick={eventNextPage.onClick}
        onKeyDown={eventNextPage.onKeyDown}
      />
    );

    return { pagerSimple, pagerPrev, pagerNext };
  }, [shape, total, current, pageSize, variant, size]);

  return (
    <nav className={_className} aria-label="Pagination" role="tabpanel">
      {pagerPrev}
      <div className={_className}>{pagerSimple}</div>
      {pagerNext}
    </nav>
  );
};

export default PaginationSimple;

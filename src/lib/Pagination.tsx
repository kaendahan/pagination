import { calculatePage, classNames, isInteger, noop } from "./utils";
import Pager, { PagerProps } from "./Pager";
import paginationCVA from "./pagination.cva";
import PagerJump, { PagerJumpProps } from "./PagerJump";
import { FC, ReactElement, cloneElement, useMemo } from "react";
import PagerSkip from "./PagerSkip";
import usePagination from "./usePagination";
import { IPaginationBaseProps } from "./types";

export interface PaginationProps extends IPaginationBaseProps {
  skipPage?: number;
}

const Pagination: FC<PaginationProps> = ({
  disabled = false,
  size = "md",
  shape = "circle",
  variant = "bordered",
  className,

  skipPage: skipPageProps = 5,
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

  const skipPage =
    isInteger(skipPageProps) && skipPageProps > 3 ? skipPageProps : 5;

  const {
    createEventJumpPage,
    createEventSkipPage,
    onChangePage: handleChange,
    handleRunIfEnter,
    pageSize,
    current,
  } = usePagination({
    current: currentProp,
    disabled,
    pageSize: pageSizeProps,
    total,
    onChangePage,
  });

  const { pagerPrev, pagerList, pagerNext } = useMemo(() => {
    const pagerList: ReactElement[] = [];
    let skipPrev: ReactElement | null = null;
    let skipNext: ReactElement | null = null;

    const pageBufferSize = 2;
    const allPages = calculatePage(undefined, pageSize, total);

    const skipPrevPage = Math.max(1, current - skipPage);
    const skipNextPage = Math.min(allPages, current + skipPage);

    const hasPrev = current > 1;
    const hasNext = current < allPages;
    const pagerProps: PagerProps = {
      onPageClick: handleChange,
      onPageKeyDown: handleRunIfEnter,
      page: -1,
      variant: variant as any,
      shape: pageShape as any,
      size: size as any,
    };

    if (allPages <= 3 + pageBufferSize * 2) {
      if (!allPages) {
        pagerList.push(<Pager {...pagerProps} key="noPager" page={1} />);
      }

      for (let i = 1; i <= allPages; i += 1) {
        pagerList.push(
          <Pager {...pagerProps} key={i} page={i} active={current === i} />
        );
      }
    } else {      
      const eventSkipPrev = createEventSkipPage(skipPrevPage);
      const eventSkipNext = createEventSkipPage(skipNextPage);
      const pagerSkipProps = {
        variant: variant as any,
        shape: pageShape,
        size,
      };
      skipPrev = skipPrevPage ? (
        <PagerSkip
          {...pagerSkipProps}
          tooltipText={String(skipPrevPage)}
          key="prev"
          jump="prev"
          onClick={eventSkipPrev.onClick}
          onKeyDown={eventSkipPrev.onKeyDown}
        />
      ) : null;

      skipNext = skipNextPage ? (
        <PagerSkip
          {...pagerSkipProps}
          tooltipText={String(skipNextPage)}
          key="next"
          jump="next"
          onClick={eventSkipNext.onClick}
          onKeyDown={eventSkipNext.onKeyDown}
        />
      ) : null;

      let left = Math.max(1, current - pageBufferSize);
      let right = Math.min(current + pageBufferSize, allPages);

      if (current - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }
      if (allPages - current <= pageBufferSize) {
        left = allPages - pageBufferSize * 2;
      }

      for (let i = left; i <= right; i += 1) {
        pagerList.push(
          <Pager {...pagerProps} key={i} page={i} active={current === i} />
        );
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pagerList[0] = cloneElement<PagerProps>(pagerList[0]);

        pagerList.unshift(skipPrev as any);
      }

      if (
        allPages - current >= pageBufferSize * 2 &&
        current !== allPages - 2
      ) {
        const lastOne = pagerList[pagerList.length - 1];
        pagerList[pagerList.length - 1] = cloneElement(lastOne);
        pagerList.push(skipNext as any);
      }

      if (left !== 1) {
        pagerList.unshift(<Pager {...pagerProps} key={1} page={1} />);
      }
      if (right !== allPages) {
        pagerList.push(
          <Pager {...pagerProps} key={allPages} page={allPages} />
        );
      }
    }

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

    const nextDisabled = !hasNext || !allPages;
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

    return {
      pagerPrev,
      pagerList,
      pagerNext,
    };
  }, [shape, total, current, pageSize, variant, size, skipPage]);

  return (
    <nav className={_className} aria-label="Pagination" role="tabpanel">
      {pagerPrev}
      <div className={_className}>{pagerList}</div>
      {pagerNext}
    </nav>
  );
};

export default Pagination;

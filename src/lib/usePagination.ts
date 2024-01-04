import { KeyboardEvent, useEffect, useState } from "react";
import { calculatePage, isInteger } from "./utils";

type TUsePagination = {
  disabled: boolean;
  current: number;
  pageSize: number;
  total: number;
  onChangePage?: (page: number, pageSize: number) => void;
};

const usePagination = (params: TUsePagination) => {
  const {
    current: currentParam,
    total,
    disabled,
    pageSize,
    onChangePage,
  } = params;
  const [current, setCurrent] = useState(currentParam);

  useEffect(() => {
    if (currentParam !== current) {
      setCurrent(currentParam);
    }
  }, [currentParam]);

  const isValid = (page: number) => {
    return isInteger(page) && page !== current && isInteger(total) && total > 0;
  };

  const handleChange = (page: number) => {
    if (isValid(page) && !disabled) {
      const currentPage = calculatePage(undefined, pageSize, total);
      let newPage = page;
      if (page > currentPage) {
        newPage = currentPage;
      } else if (page < 1) {
        newPage = 1;
      }

      setCurrent(newPage);
      onChangePage?.(newPage, pageSize);
      return newPage;
    }

    return current;
  };

  const handleRunIfEnter = (
    event: KeyboardEvent<HTMLButtonElement>,
    callback: (...args: any) => void,
    ...restParams: any
  ) => {
    if (event.key === "Enter") {
      callback(...restParams);
    }
  };

  const createEventJumpPage = (args: {
    jump: "prev" | "next";
    hasJump?: boolean;
  }) => {
    const { jump, hasJump = true } = args;

    const jumpPage = jump === "prev" ? current - 1 : current + 1;
    return {
      onClick: () => {
        if (hasJump) {
          handleChange(jumpPage);
        }
      },
      onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
        handleRunIfEnter(event as KeyboardEvent<HTMLButtonElement>, () => {
          if (hasJump) {
            handleChange(jumpPage);
          }
        });
      },
    };
  };

  const createEventSkipPage = (page: number) => {
    return {
      onClick: () => {
        handleChange(page);
      },
      onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
        handleRunIfEnter(event as KeyboardEvent<HTMLButtonElement>, () => {
          handleChange(page);
        });
      },
    };
  };

  return {
    current,
    pageSize,
    createEventJumpPage,
    createEventSkipPage,
    onChangePage: handleChange,
    handleRunIfEnter,
  };
};

export default usePagination;

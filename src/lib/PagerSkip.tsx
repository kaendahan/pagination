import { FC, useState } from "react";
import { SkipNextIcon, SkipPrevIcon, SkipIcon } from "./icons";
import {
  FloatingPortal,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import Pager from "./Pager";
import { PagerJumpProps } from "./PagerJump";
import { sizeIcon } from "./utils";

export interface PagerSkipProps extends PagerJumpProps {
  tooltipText: string;
}

const PagerSkip: FC<PagerSkipProps> = ({
  tooltipText,
  jump,
  size,
  ...props
}) => {
  const [isHover, setIsHover] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isHover,
    onOpenChange: setIsHover,
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const Icon = isHover
    ? jump === "next"
      ? SkipNextIcon
      : SkipPrevIcon
    : SkipIcon;
  const iconSIze = size ? sizeIcon[size] : sizeIcon.md;

  return (
    <>
      <Pager
        {...props}
        size={size}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <span className="sr-only">{`Pager-skip-${jump}`}</span>
        <Icon size={iconSIze} />
      </Pager>
      <FloatingPortal>
        {isHover && (
          <div
            className="bg-secondary text-sm text-secondary-emphasis px-2 py-1 rounded box-border w-max w-[calc(100vw - 10px)]"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {tooltipText}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default PagerSkip;

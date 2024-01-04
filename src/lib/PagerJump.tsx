import { JumpPrevIcon, JumpNextIcon } from "./icons";
import Pager, { PagerProps } from "./Pager";
import { FC } from "react";
import { sizeIcon } from "./utils";

const shapeAlias = {
  rounded: {
    prev: "prev",
    next: "next-md",
  },
  "rounded-md": {
    prev: "prev-md",
    next: "next-md",
  },
  "rounded-lg": {
    prev: "prev-lg",
    next: "next-lg",
  },
  circle: {
    prev: "prev-full",
    next: "next-full",
  },
};

const createAliasShape = (
  isBorderedGroup: boolean = false,
  shape: any,
  jump: "prev" | "next"
) => {
  if (!isBorderedGroup) return shape ? shape : "rounded";
  switch (shape) {
    case "rounded":
      return shapeAlias["rounded"][jump];
    case "rounded-md":
      return shapeAlias["rounded-md"][jump];
    case "rounded-lg":
      return shapeAlias["rounded-lg"][jump];
    case "circle":
      return shapeAlias["circle"][jump];
    default:
      return shape ? shape : "rounded";
  }
};

export interface PagerJumpProps extends PagerProps {
  jump: "prev" | "next";
  isBorderedGroup?: boolean;
}

const PagerJump: FC<PagerJumpProps> = ({
  jump,
  shape = "rounded",
  isBorderedGroup = false,
  size = "md",
  ...props
}) => {
  const Icon = jump === "next" ? JumpNextIcon : JumpPrevIcon;
  const iconSIze = size ? sizeIcon[size] : sizeIcon.md;

  return (
    <Pager
      {...props}
      shape={createAliasShape(isBorderedGroup, shape, jump)}
      size={size}
    >
      <span className="sr-only">{`Pager-${jump}`}</span>
      <Icon size={iconSIze} />
    </Pager>
  );
};

export default PagerJump;

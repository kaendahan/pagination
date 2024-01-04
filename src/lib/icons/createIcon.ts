import {
  forwardRef,
  createElement,
  ReactSVG,
  SVGProps,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { classNames } from "../utils";

export type IconNode = [
  elementName: keyof ReactSVG,
  attrs: Record<string, string>
][];

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface IconProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type TIcon = ForwardRefExoticComponent<IconProps>;

const defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const createLucideIcon = (iconName: string, iconNode: IconNode): TIcon => {
  const Component = forwardRef<SVGSVGElement, IconProps>(
    (
      {
        color = "currentColor",
        size = 24,
        strokeWidth = 2,
        absoluteStrokeWidth,
        className = "",
        children,
        ...rest
      },
      ref
    ) =>
      createElement(
        "svg",
        {
          ref,
          ...defaultProps,
          width: size,
          height: size,
          stroke: color,
          "aria-label": iconName,
          strokeWidth: absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
          className: classNames(className),
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
          ...(Array.isArray(children) ? children : [children]),
        ]
      )
  );
  return Component;
};

export default createLucideIcon;

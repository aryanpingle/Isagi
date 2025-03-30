import { toCSSMeasurement } from "@/utils/utils";
import React from "react";

export type BoxProps = React.HTMLAttributes<HTMLSpanElement> & {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number | string;
  ref?: React.Ref<HTMLSpanElement>;
  shadowColor?: string;
  shadowX?: number | string;
  shadowY?: number | string;
  shadowOffset?: number | string;
};

export const Box = ({
  backgroundColor,
  children,
  borderRadius: _borderRadius,
  ref,
  shadowColor = "black",
  shadowOffset,
  shadowX,
  shadowY,
  style,
  ...spanProps
}: BoxProps) => {
  const borderRadius = toCSSMeasurement(_borderRadius ?? 0);
  const boxShadowX = toCSSMeasurement(shadowX ?? shadowOffset ?? 0);
  const boxShadowY = toCSSMeasurement(shadowY ?? shadowOffset ?? 0);
  const boxShadowColor = shadowColor ?? "black";

  const mergedStyle: React.CSSProperties = {
    ...{
      backgroundColor: backgroundColor,
      border: `0.1rem solid ${boxShadowColor}`,
      borderRadius: borderRadius,
      boxShadow: `${boxShadowX} ${boxShadowY} 0 ${boxShadowColor}`,
    },
    ...style,
  };

  return (
    <span ref={ref} {...spanProps} style={mergedStyle}>
      {children}
    </span>
  );
};

import { toCSSMeasurement } from "@/utils/utils";
import React from "react";

export type BoxProps = React.HTMLAttributes<HTMLSpanElement> & {
  borderColor?: string;
  borderRadius?: number | string;
  shadowColor?: string;
  shadowX?: number | string;
  shadowY?: number | string;
  shadowOffset?: number | string;
};

export const Box = ({
  children,
  borderColor = "black",
  borderRadius: _borderRadius,
  shadowColor = "black",
  shadowOffset,
  shadowX,
  shadowY,
  ...spanProps
}: BoxProps) => {
  const borderRadius = toCSSMeasurement(_borderRadius ?? 0);
  const boxShadowX = toCSSMeasurement(shadowX ?? shadowOffset ?? 0);
  const boxShadowY = toCSSMeasurement(shadowY ?? shadowOffset ?? 0);
  const boxShadowColor = shadowColor ?? "black";
  return (
    <span
      {...spanProps}
      style={{
        border: `0.1em solid ${boxShadowColor}`,
        borderRadius: borderRadius,
        boxShadow: `${boxShadowX} ${boxShadowY} 0 ${boxShadowColor}`,
      }}
    >
      {children}
    </span>
  );
};

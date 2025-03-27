import React from "react";
import styled from "./Button.module.css";
import { composeClasses } from "@/utils/utils";

export type ButtonProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLButtonElement> & {
    backgroundColor?: string;
    disabled?: boolean;
    withShadow?: boolean;
    variant?: "primary" | "neutral";
    onClick?: React.HTMLAttributes<HTMLButtonElement>["onClick"];
  }
>;

export const Button = ({
  backgroundColor,
  children,
  disabled,
  onClick,
  variant = "neutral",
  withShadow,
  style,
  ...otherProps
}: ButtonProps) => {
  const className = composeClasses([
    styled.button,
    variant === "primary"
      ? styled["button--variant-primary"]
      : styled["button--variant-neutral"],
    withShadow && styled["button--with_shadow"],
    disabled && styled["button--disabled"],
  ]);

  const mergedStyle = {
    backgroundColor,
    ...style,
  } as React.CSSProperties;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={className}
      style={mergedStyle}
      {...otherProps}
    >
      {children}
    </button>
  );
};

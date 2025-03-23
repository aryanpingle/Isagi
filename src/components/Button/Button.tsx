import React from "react";
import styled from "./Button.module.css";

export type ButtonProps = React.JSX.IntrinsicElements["button"];

export const Button = (props: ButtonProps) => {
  return (
    <button className={styled.button} {...props}>
      {props.children}
    </button>
  );
};

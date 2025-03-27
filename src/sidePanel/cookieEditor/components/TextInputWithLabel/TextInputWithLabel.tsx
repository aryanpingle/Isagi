import { Box } from "@/components/Box/Box";
import styles from "./TextInputWithLabel.module.css";
import React, { useEffect, useRef, useState } from "react";

type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;
type DivAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export type TextInputWithLabelProps = InputAttributes & {
  label: string;
  error?: string;
  value?: string;
  validation?: (value: string) => void;
};

export const TextInputWithLabel = ({
  label,
  error,
  style,
  ...inputProps
}: TextInputWithLabelProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className={styles.text_input_with_label}>
      <label className={styles.label} htmlFor={inputProps.name}>
        {label}
      </label>
      <Box className={styles["input_element-container"]}>
        <input
          ref={ref}
          className={styles.input_element}
          type="text"
          {...inputProps}
        />
      </Box>
      {error && <span color="red">{error}</span>}
    </div>
  );
};

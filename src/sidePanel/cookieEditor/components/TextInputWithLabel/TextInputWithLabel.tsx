import { Box } from "@/components/Box/Box";
import styles from "./TextInputWithLabel.module.css";
import React from "react";

type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export type TextInputWithLabelProps = InputAttributes & {
  label: string;
  error?: string;
  value?: string;
  validation?: (value: string) => void;
};

export const TextInputWithLabel = ({
  label,
  error,
  ...inputProps
}: TextInputWithLabelProps) => {
  return (
    <div className={styles.text_input_with_label}>
      <label className={styles.label} htmlFor={inputProps.name}>
        {label}
      </label>
      <Box className={styles["input_element-container"]}>
        <input className={styles.input_element} type="text" {...inputProps} />
      </Box>
      {error && <span color="red">{error}</span>}
    </div>
  );
};

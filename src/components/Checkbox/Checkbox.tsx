import { useId, useMemo } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
};

export const Checkbox = ({ label, ...inputProps }: CheckboxProps) => {
  const id = useId();
  const inputId = useMemo(() => `checkbox-${id}`, [id]);

  return (
    <label htmlFor={inputId} className={styles.checkbox_label}>
      <input
        type="checkbox"
        className={styles.checkbox_input}
        {...inputProps}
        id={inputId}
      />
      {label}
    </label>
  );
};

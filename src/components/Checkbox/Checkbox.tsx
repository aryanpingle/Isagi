import styles from "./Checkbox.module.css";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
};

export const Checkbox = ({ label, ...inputProps }: CheckboxProps) => {
  return (
    <label htmlFor={inputProps.name} className={styles.checkbox_label}>
      <input
        type="checkbox"
        className={styles.checkbox_input}
        {...inputProps}
      />
      {label}
    </label>
  );
};

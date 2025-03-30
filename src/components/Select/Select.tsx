import { Box } from "../Box/Box";
import styles from "./Select.module.css";

export type SelectOption = {
  value: string;
  label: React.ReactNode;
};

export type SelectProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  label: React.ReactNode;
  options: SelectOption[];
};

export const Select = ({ label, options, ...selectProps }: SelectProps) => {
  return (
    <div className={styles.select_container}>
      <label className={styles.label}>{label}</label>
      <Box>
        <select className={styles.select} {...selectProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Box>
    </div>
  );
};

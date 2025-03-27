import styles from "./SearchBar.module.css";
import { useRef } from "react";
import { Box, BoxProps } from "../Box/Box";
import { FaSearch } from "react-icons/fa";

type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type SearchBarProps = BoxProps & {
  onQuery?: (query: string) => void;
  inputElementProps?: HTMLInputProps;
};

export const SearchBar = ({
  onQuery,
  style,
  inputElementProps,
  ...boxProps
}: SearchBarProps) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    const query = inputElement.current?.value ?? "";
    onQuery?.(query);
  };

  const mergedStyle: React.CSSProperties = {
    borderRadius: "4px",
    fontWeight: 600,
    color: "black",
    ...style,
  };

  return (
    <Box className={styles.search_bar} style={mergedStyle} {...boxProps}>
      <FaSearch size="1em" />
      <input
        ref={inputElement}
        className={styles["search_bar-input"]}
        type="text"
        onInput={handleInput}
        placeholder="Search for cookies"
        {...inputElementProps}
      />
    </Box>
  );
};

import { useCallback, useMemo, useState } from "react";
import {
  SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "../SyntaxHighlighter";
import styles from "./CodeBlock.module.css";
import { Button } from "../Button";
import { composeClasses } from "@/utils/utils";
import { FaCheck, FaRegClipboard } from "react-icons/fa";
import { Box } from "../Box/Box";

export type CodeConfig = {
  title: string;
  language: SyntaxHighlighterProps["language"];
  text: string;
};

export type CodeBlockProps = {
  codeConfigs: CodeConfig[];
};

export const CodeBlock = ({ codeConfigs }: CodeBlockProps) => {
  const [selectedCodeIndex, setSelectedCodeIndex] = useState(0);
  const [hasBeenCopied, setHasBeenCopied] = useState(false);

  const selectedCodeConfig = useMemo(
    () => codeConfigs[selectedCodeIndex],
    [codeConfigs, selectedCodeIndex]
  );

  const tabs = useMemo(() => {
    return codeConfigs.map((config, index) => {
      const classNames = composeClasses([
        styles["code_block-header_tab"],
        selectedCodeIndex === index && styles["tab--selected"],
      ]);
      return (
        <div
          className={classNames}
          key={config.title}
          onClick={() => setSelectedCodeIndex(index)}
        >
          {config.title}
        </div>
      );
    });
  }, [codeConfigs, selectedCodeIndex]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(selectedCodeConfig.text);
    setHasBeenCopied(true);
    setTimeout(() => {
      setHasBeenCopied(false);
    }, 1500);
  }, [selectedCodeConfig.text]);

  return (
    <Box style={{ display: "block" }} shadowOffset={4} borderRadius={4}>
      {/* Header */}
      <div className={styles["code_block-header"]}>
        <div className={styles["code_block-header_tabs"]}>{tabs}</div>
        <div className={styles["code_block-header_copy"]}>
          <Button withShadow onClick={handleCopy} backgroundColor="#7DD4A8">
            {hasBeenCopied ? <FaCheck /> : <FaRegClipboard />}
          </Button>
        </div>
      </div>
      {/* Code */}
      <SyntaxHighlighter
        language={selectedCodeConfig["language"]}
        text={selectedCodeConfig["text"]}
      />
    </Box>
  );
};

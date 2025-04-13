import styles from "./SyntaxHighlighter.module.css";
import hljs from "highlight.js/lib/core";
import { useMemo } from "react";

export type SyntaxHighlighterProps = {
  text: string;
  language: "json" | "javascript" | "text";
};

export const SyntaxHighlighter = ({
  text,
  language,
}: SyntaxHighlighterProps) => {
  const code = useMemo(() => {
    return hljs.highlight(text, { language: language }).value;
  }, [language, text]);

  const dangerousHTMLValue = useMemo(() => {
    return { __html: code };
  }, [code]);

  return (
    <div className={styles.syntax_highlighter}>
      <pre
        className={styles["syntax_highlighter-code"]}
        dangerouslySetInnerHTML={dangerousHTMLValue}
      />
    </div>
  );
};

import styles from "./CookieTile.module.css";
import { memo, useCallback, useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/Button";
import { CookieTileContent } from "../CookieTileContent";
import { Box } from "@/components/Box/Box";
import { FaDeleteLeft } from "react-icons/fa6";

export interface CookieTileProps {
  cookie: chrome.cookies.Cookie;
  onDeleteCookie: (cookie: chrome.cookies.Cookie) => void;
}

export const CookieTile = memo(
  ({ cookie, onDeleteCookie }: CookieTileProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = useCallback(() => {
      setIsExpanded((prev) => !prev);
    }, [setIsExpanded]);

    const ExpandOrCollapseIcon = useMemo(() => {
      return isExpanded ? <FaChevronUp /> : <FaChevronDown />;
    }, [isExpanded]);

    const handleDeleteCookie = useCallback(() => {
      onDeleteCookie(cookie);
    }, [onDeleteCookie, cookie]);

    return (
      <Box className={styles.cookie_tile} shadowOffset={4} borderRadius={4}>
        <div
          className={styles["cookie_tile-header"]}
          onClick={toggleIsExpanded}
        >
          <span
            style={{
              fontSize: "0.75em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.75,
            }}
          >
            {ExpandOrCollapseIcon}
          </span>
          <div className={styles["cookie_tile-header_info"]}>
            <span className={styles["cookie_tile-name"]}>{cookie.name}</span>
          </div>
          <Button
            withShadow
            backgroundColor="red"
            onClick={handleDeleteCookie}
          >
            <MdDelete size="1.5em" color="black" />
          </Button>
        </div>
        {isExpanded && <CookieTileContent cookie={cookie} />}
      </Box>
    );
  }
);

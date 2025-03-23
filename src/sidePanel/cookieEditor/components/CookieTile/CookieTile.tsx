import styles from "./CookieTile.module.css";
import { memo, useCallback, useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/Button";
import { CookieTileContent } from "../CookieTileContent";

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
      <div className={styles.cookie_tile}>
        <div
          className={styles["cookie_tile-header"]}
          onClick={toggleIsExpanded}
        >
          <Button>{ExpandOrCollapseIcon}</Button>
          <div className={styles["cookie_tile-header_info"]}>
            <span className={styles["cookie_tile-domain"]}>
              {cookie.domain}
            </span>
            <span className={styles["cookie_tile-name"]}>{cookie.name}</span>
          </div>
          <Button onClick={handleDeleteCookie}>
            <MdDelete color="red" />
          </Button>
        </div>
        {isExpanded && <CookieTileContent cookie={cookie} />}
      </div>
    );
  }
);

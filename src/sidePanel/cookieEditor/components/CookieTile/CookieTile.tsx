import styles from "./CookieTile.module.css";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/Button";
import { CookieTileContent } from "../CookieTileContent";
import { Box } from "@/components/Box/Box";
import { useCommonManagement } from "@/hooks/useCommonManagement";
import { ChromeCookie } from "@/utils/cookie";

export interface CookieTileProps {
  cookie: ChromeCookie;
  onCookieDeleted?: (cookie: ChromeCookie) => void;
}

const CookieTileUnmemoized = ({ cookie, onCookieDeleted }: CookieTileProps) => {
  const {
    state: { tab },
  } = useCommonManagement();

  const tileRef = useRef<HTMLSpanElement>(null);

  // Set the displayed cookie name to the saved cookie
  // name (if any) otherwise the actual cookie's name
  const [savedCookieName, setSavedCookieName] = useState<string | null>(null);
  const cookieName = useMemo(() => {
    if (savedCookieName !== null) return savedCookieName;
    return cookie.name;
  }, [cookie.name, savedCookieName]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  useEffect(() => {
    if (isExpanded === true) {
      tileRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isExpanded]);

  const ExpandOrCollapseIcon = useMemo(() => {
    return isExpanded ? <FaChevronUp /> : <FaChevronDown />;
  }, [isExpanded]);

  const deleteCookie = useCallback(
    async (event: React.MouseEvent) => {
      event.stopPropagation();

      if (!tab?.url) return;

      // Delete the cookie
      await chrome.cookies.remove({
        name: cookie.name,
        url: tab.url,
      });
      onCookieDeleted?.(cookie);
    },
    [cookie, onCookieDeleted, tab?.url]
  );

  const handleCookieSaved = useCallback((savedCookie: ChromeCookie) => {
    // Update the title
    setSavedCookieName(savedCookie.name);
  }, []);

  return (
    <Box
      ref={tileRef}
      className={styles.cookie_tile}
      shadowOffset={4}
      borderRadius={4}
    >
      <div className={styles["cookie_tile-header"]} onClick={toggleIsExpanded}>
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
          <span className={styles["cookie_tile-name"]}>{cookieName}</span>
        </div>
        <Button
          withShadow
          backgroundColor="hsl(0, 75%, 50%)"
          onClick={deleteCookie}
          style={{ padding: "0.25em" }}
        >
          <MdDelete size="1.5em" color="black" />
        </Button>
      </div>
      {isExpanded && (
        <CookieTileContent cookie={cookie} onCookieSaved={handleCookieSaved} />
      )}
    </Box>
  );
};

export const CookieTile = memo(CookieTileUnmemoized);

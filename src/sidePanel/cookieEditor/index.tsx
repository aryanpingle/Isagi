import styles from "./index.module.css";
import { useCommonManagement } from "@/hooks/useCommonManagement";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CookieTile } from "./components/CookieTile";
import { SearchBar } from "@/components/SearchBar";
import { CookieTileList } from "./components/CookieTileList";
import { Button } from "@/components/Button";
import { MdOutlineRefresh } from "react-icons/md";

const CookieEditorPage = () => {
  const {
    state: { tab },
  } = useCommonManagement();

  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (!tab) return;
    chrome.cookies.getAll({ url: tab.url }).then((cookies) => {
      setCookies(cookies);
    });
  }, [tab]);

  const handleDeleteCookie = useCallback(
    (cookie: chrome.cookies.Cookie) => {
      if (!tab?.url) return;
      chrome.cookies.remove({
        name: cookie.name,
        url: tab.url,
      });
    },
    [tab]
  );

  const handleQuery = useCallback(
    (query: string) => {
      setQuery(query);
    },
    [setQuery]
  );

  const displayedCookies: chrome.cookies.Cookie[] = useMemo(() => {
    const queryLowerCase = query.toLowerCase();
    return cookies
      .filter((c) => {
        return c.name.toLowerCase().includes(queryLowerCase);
      })
      .sort((c1, c2) =>
        c1.name.toLowerCase().localeCompare(c2.name.toLowerCase())
      );
  }, [query, cookies]);

  // Debugging
  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className={styles.cookie_editor_page}>
      <h2 className={styles["cookie_editor_page-header"]}>Cookie Editor</h2>
      <div className={styles["cookie_editor_page-query_section"]}>
        <SearchBar
          shadowOffset={2}
          style={{ backgroundColor: "#7DD4A8" }}
          onQuery={handleQuery}
        />
        <Button
          withShadow
          backgroundColor="#7DD4A8"
          variant="primary"
          onClick={refreshPage}
          style={{
            aspectRatio: "1 / 1",
            height: "100%",
          }}
        >
          <MdOutlineRefresh size="2em" />
        </Button>
      </div>
      <div className={styles.cookie_tile_list_container}>
        <CookieTileList
          cookies={displayedCookies}
          onDeleteCookie={handleDeleteCookie}
        />
      </div>
    </div>
  );
};

createRoot(document.body).render(<CookieEditorPage />);

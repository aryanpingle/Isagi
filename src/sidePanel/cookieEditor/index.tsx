import styles from "./index.module.css";
import { useCommonManagement } from "@/hooks/useCommonManagement";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { SearchBar } from "@/components/SearchBar";
import { CookieTileList } from "./components/CookieTileList";
import { Button } from "@/components/Button";
import { MdOutlineRefresh } from "react-icons/md";
import { useModal } from "@/components/Modal";
import { AddCookieButton } from "./components/AddCookieButton";
import { ChromeCookie } from "@/utils/cookie";

const CookieEditorPage = () => {
  const {
    state: { tab },
  } = useCommonManagement();

  const { modalNode, setIsModalOpen, setModalDetails } = useModal();

  const [cookies, setCookies] = useState<ChromeCookie[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (!tab) return;
    chrome.cookies.getAll({ url: tab.url }).then((cookies) => {
      setCookies(cookies);
    });
  }, [tab]);

  const handleCookieAdded = useCallback((cookie: ChromeCookie) => {
    // Add this cookie to the (local) cookies list
    setCookies((cookies) => {
      return [...cookies, cookie];
    });
  }, []);

  const handleCookieDeleted = useCallback((deletedCookie: ChromeCookie) => {
    const deletedCookieStringified = JSON.stringify(deletedCookie);
    // Remove this cookie from the (local) cookies list
    setCookies((cookies) => {
      return cookies.filter(
        (cookie) => JSON.stringify(cookie) !== deletedCookieStringified
      );
    });
  }, []);

  const handleQuery = useCallback(
    (query: string) => {
      setQuery(query);
    },
    [setQuery]
  );

  const displayedCookies: ChromeCookie[] = useMemo(() => {
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
          backgroundColor="#7DD4A8"
          shadowOffset={2}
          onQuery={handleQuery}
          style={{ height: "100%", marginTop: 0 }}
        />
        <Button
          withShadow
          backgroundColor="#7DD4A8"
          variant="primary"
          onClick={refreshPage}
          style={{
            aspectRatio: "1 / 1",
            height: "100%",
            marginBottom: "4px",
          }}
        >
          <MdOutlineRefresh size="2em" />
        </Button>
      </div>
      <div className={styles.cookie_tile_list_container}>
        <CookieTileList
          cookies={displayedCookies}
          onCookieDeleted={handleCookieDeleted}
        />
      </div>
      <div>
        <AddCookieButton
          withShadow
          backgroundColor="#7DD4A8"
          setIsModalOpen={setIsModalOpen}
          setModalDetails={setModalDetails}
          onCookieAdded={handleCookieAdded}
        />
      </div>
      {modalNode}
    </div>
  );
};

createRoot(document.body).render(<CookieEditorPage />);

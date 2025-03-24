import { useCommonManagement } from "@/hooks/useCommonManagement";
import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CookieTile } from "./components/CookieTile";

const CookieEditorPage = () => {
  const {
    state: { tab },
  } = useCommonManagement();

  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);

  useEffect(() => {
    if (!tab) return;
    chrome.cookies.getAll({ url: tab.url }).then((cookies) => {
      setCookies(cookies);
    });
  }, [tab, setCookies]);

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

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "0.5em",
        }}
      >
        {cookies.map((cookie) => (
          <CookieTile cookie={cookie} onDeleteCookie={handleDeleteCookie} />
        ))}
      </div>
    </div>
  );
};

createRoot(document.body).render(<CookieEditorPage />);

import { useCommonManagement } from "@/hooks/useCommonManagement";
import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CookieTile } from "./components/CookieTile";

const CookieEditorPage = () => {
  const {
    state: { url },
  } = useCommonManagement();

  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);

  useEffect(() => {
    chrome.cookies.getAll({ url: url }).then((cookies) => {
      setCookies(cookies);
    });
  }, [url, setCookies]);

  const handleDeleteCookie = useCallback(
    (cookie: chrome.cookies.Cookie) => {
      chrome.cookies.remove({
        name: cookie.name,
        url: url,
      });
    },
    [url]
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "0.25em",
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

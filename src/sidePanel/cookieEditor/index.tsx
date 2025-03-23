import { useCommonManagement } from "@/hooks/useCommonManagement";
import { useEffect, useState } from "react";
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

  return (
    <>
      {cookies.map((cookie) => (
        <CookieTile cookie={cookie} />
      ))}
    </>
  );
};

createRoot(document.body).render(<CookieEditorPage />);

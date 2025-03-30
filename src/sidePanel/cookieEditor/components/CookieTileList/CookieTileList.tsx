import { FaCookieBite } from "react-icons/fa";
import { CookieTile } from "../CookieTile/CookieTile";
import styles from "./CookieTileList.module.css";

export type CookieTileListProps = {
  cookies: chrome.cookies.Cookie[];
  onDeleteCookie: (cookie: chrome.cookies.Cookie) => void;
};

function getCookieKey(cookie: chrome.cookies.Cookie): React.Key {
  return JSON.stringify(cookie);
}

export const CookieTileList = ({
  cookies,
  onDeleteCookie,
}: CookieTileListProps) => {
  return cookies.length ? (
    <div className={styles.cookie_tile_list}>
      {cookies.map((cookie) => (
        <CookieTile
          key={getCookieKey(cookie)}
          cookie={cookie}
          onDeleteCookie={onDeleteCookie}
        />
      ))}
    </div>
  ) : (
    <div className={styles.no_cookie_found}>
      <FaCookieBite size="4em" />
      <br />
      No cookies found
    </div>
  );
};

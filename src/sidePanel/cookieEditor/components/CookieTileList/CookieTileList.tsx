import { FaCookieBite } from "react-icons/fa";
import { CookieTile } from "../CookieTile/CookieTile";
import styles from "./CookieTileList.module.css";
import { ChromeCookie, getCookieKey } from "@/utils/cookie";

export type CookieTileListProps = {
  cookies: ChromeCookie[];
  onCookieDeleted?: (cookie: ChromeCookie) => void;
};

export const CookieTileList = ({
  cookies,
  onCookieDeleted,
}: CookieTileListProps) => {
  return cookies.length ? (
    <div className={styles.cookie_tile_list}>
      {cookies.map((cookie) => (
        <CookieTile
          key={getCookieKey(cookie)}
          cookie={cookie}
          onCookieDeleted={onCookieDeleted}
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

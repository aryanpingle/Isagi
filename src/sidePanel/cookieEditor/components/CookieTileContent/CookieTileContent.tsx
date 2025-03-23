import styles from "./CookieTileContent.module.css";

export interface CookieTileProps {
  cookie: chrome.cookies.Cookie;
}

export const CookieTileContent = ({ cookie }: CookieTileProps) => {
  return (
    <div className={styles["cookie_tile-content"]}>
      {/* Important ones first */}
      <div>Name: {cookie.name}</div>
      <div>Value: {cookie.value}</div>
      <div>Domain: {cookie.domain}</div>
      <div>Path: {cookie.path}</div>

      {/* The rest */}
      <div>Expiration Date: {cookie.expirationDate}</div>
      <div>Host Only: {cookie.hostOnly}</div>
      <div>HTTP Only: {cookie.httpOnly}</div>
      <div>Same Site: {cookie.sameSite}</div>
    </div>
  );
};

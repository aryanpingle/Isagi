export interface CookieTileProps {
  cookie: chrome.cookies.Cookie;
}

export const CookieTile = ({ cookie }: CookieTileProps) => {
  return <div>{cookie.name}</div>;
};

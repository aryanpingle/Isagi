export type ChromeCookie = chrome.cookies.Cookie;

export function getCookieKey(cookie: ChromeCookie): React.Key {
  return JSON.stringify(cookie);
}

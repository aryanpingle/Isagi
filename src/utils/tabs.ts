export function getCurrentWindowActiveTab() {
  return chrome.tabs.query({ active: true, currentWindow: true });
}

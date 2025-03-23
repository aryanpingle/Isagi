import { getCurrentWindowActiveTab } from "@/utils/tabs";

type Listener = () => void;

class URLStore {
  url?: string;
  listeners: Listener[] = [];

  constructor() {
    // Set the current URL
    getCurrentWindowActiveTab().then(([tab]) => {
      this.updateURL(tab.url);
    });

    // onActivated - when user changes tabs
    // onUpdated - when URL changes
    // Reference: https://stackoverflow.com/a/77277551
    chrome.tabs.onActivated.addListener(async (event) => {
      const tab = await chrome.tabs.get(event.tabId);
      this.updateURL(tab.url);
    });
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
      if (!tab.active) return;
      this.updateURL(tab.url);
    });
  }

  subscribe = (listener: Listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };

  getSnapshot = () => {
    return this.url;
  };

  updateURL = (url: string) => {
    this.url = url;

    for (const listener of this.listeners) {
      listener();
    }
  };
}

export const URL_STORE = new URLStore();

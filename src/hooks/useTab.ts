import { getCurrentWindowActiveTab } from "@/utils/tabs";

type Listener = () => void;

export type Tab = chrome.tabs.Tab;

class TabStore {
  tab?: Tab;
  listeners: Listener[] = [];

  constructor() {
    // Set the current tab
    getCurrentWindowActiveTab().then(([tab]) => {
      this.updateTab(tab);
    });

    // onActivated - when user changes tabs
    // onUpdated - when URL changes
    // Reference: https://stackoverflow.com/a/77277551
    chrome.tabs.onActivated.addListener(async (event) => {
      const tab = await chrome.tabs.get(event.tabId);
      this.updateTab(tab);
    });
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
      if (!tab.active) return;
      this.updateTab(tab);
    });
  }

  subscribe = (listener: Listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };

  getSnapshot = () => {
    return this.tab;
  };

  updateTab = (tab: Tab) => {
    this.tab = tab;
    for (const listener of this.listeners) {
      listener();
    }
  };
}

export const TAB_STORE = new TabStore();

async function openSidePanel() {
  // Set the side-panel config options
  chrome.sidePanel.setOptions({
    // tabId: tab.id,
    path: "src/sidePanel/cookieEditor/index.html",
    enabled: true,
  });
  // Use the current tab id to open the side-panel
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.sidePanel.open({ windowId: tab.windowId });
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  if (button) {
    button.onclick = () => {
      openSidePanel();
    };
  }
});

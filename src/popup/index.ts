async function openSidePanel() {
  // Set the side-panel config options
  chrome.sidePanel.setOptions({
    // tabId: tab.id,
    path: "src/sidePanel/cookieEditor/index.html",
    enabled: true,
  });
  // Use the current tab id to open the side-panel
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab)
  chrome.sidePanel.open({ tabId: tab.id });

  // chrome.windows.getCurrent({ populate: true }, (window) => {
  //   window.tabs
  //     .filter((tab) => tab.active)
  //     .forEach((tab) => {
  //     });
  // });
  // chrome.runtime.sendMessage({ action: 'openSidePanelCookieEditor' })
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  if (window.EyeDropper) {
    button.onclick = () => {
      // const e = new window.EyeDropper();
      // e.open().then((res) => {
      //   alert(JSON.stringify(res));
      // });
      openSidePanel();
    };
  }
});

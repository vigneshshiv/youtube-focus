// Add Event Listener for chrome tabs created
chrome.tabs.onCreated.addListener(addBlur);
chrome.tabs.onUpdated.addListener(initTabUpdateHandler);

// Listen tab complete and apply CSS
function initTabUpdateHandler(tabId, info, tab) {
  if (info.status == "complete") {
    addBlur(tab);
  }
}

function addBlur(tab) {
  const tabUrl = tab.url;
  if (tabUrl && tabUrl.indexOf("youtube.com/watch?") !== -1) {
    chrome.tabs.insertCSS(tab.id, {
      file: "focus-mode-style.css"
    });
  }
}
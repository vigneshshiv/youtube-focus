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
  if (tabUrl) {
    if (tabUrl.indexOf("youtube.com/watch") !== -1 || tabUrl.indexOf("youtube.com/clip") !== -1) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["focus-mode-style.css"]
      });
    } else if (tabUrl.indexOf("youtube.com") !== -1) {
      chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: ["focus-mode-style.css"]
      });
    }
  }
}
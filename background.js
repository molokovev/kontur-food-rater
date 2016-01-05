var SITE_NAME = 'cafe.skbkontur.ru';

// Call the above function when the url of a tab changes.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf(SITE_NAME) !== -1) {
    chrome.pageAction.show(tabId);
  }
});
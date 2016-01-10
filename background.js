var SITE_NAME = 'cafe.skbkontur.ru';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf(SITE_NAME) !== -1) {
    chrome.pageAction.show(tabId);
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.event) {
      case 'ClearAll':
        _gaq.push(['_trackEvent', 'Rate', 'ClearAll']);
        break;
      case 'OpenPopup':
        _gaq.push(['_trackEvent', 'Popup', 'open']);
        break;
      case 'ResetRate':
        _gaq.push(['_trackEvent', 'Rate', 'Clear', request.name]);
        break;
      case 'SetRate':
        _gaq.push(['_trackEvent', 'Rate', request.value + ' stars', request.name]);
        break;
      default:
    }
  });
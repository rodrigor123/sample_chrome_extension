const injectContentScript = `
  var script = document.createElement('script');
  script.id = 'upext';
  script.src = 'chrome-extension://${chrome.runtime.id}/js/inject.js';
  document.body.appendChild(script);
`;

const appendExtId = `
  var script = document.createElement('script');
  script.textContent = "var __extensionId = " + JSON.stringify(chrome.runtime.id);
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
`;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url === 'http://localhost:5000/') {
    chrome.tabs.executeScript(tabId, {
      code: appendExtId
    });
    chrome.tabs.executeScript(tabId, {
      code: injectContentScript
    });
  }
});

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.data) {
      const response = JSON.parse(request.data);

      const user = response.data[0];

      const opt = {
        type: "basic",
        title: user.first_name + " " + user.last_name,
        message: "Primary message to display",
        iconUrl: user.avatar
      }

      chrome.notifications.create(opt);
    }
  });
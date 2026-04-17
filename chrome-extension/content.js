// content.js - The bridge between the Web App and the Extension
window.addEventListener("message", (event) => {
  // Only accept messages from our app
  if (event.source !== window) return;

  if (event.data.type && event.data.type === "GSD_JIRA_PROXY_REQUEST") {
    console.log("ContentScript: Relaying request to Background...");
    
    chrome.runtime.sendMessage({
      type: "JIRA_FETCH",
      url: event.data.url,
      method: event.data.method,
      headers: event.data.headers,
      body: event.data.body
    }, (response) => {
      // Send result back to the Web App
      window.postMessage({
        type: "GSD_JIRA_PROXY_RESPONSE",
        requestId: event.data.requestId,
        response: response
      }, "*");
    });
  }
});

console.log("FocusOnCCSI Bridge Extension: Content Script Loaded");

// backgrounds.js - The engine that bypasses CORS/WAF
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "JIRA_FETCH") {
    console.log("Extension: Fetching from Jira...", request.url);
    
    fetch(request.url, {
      method: request.method || "GET",
      headers: request.headers,
      body: request.body ? JSON.stringify(request.body) : undefined
    })
    .then(async (response) => {
      const isJson = response.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await response.json() : await response.text();
      
      sendResponse({ 
        success: response.ok, 
        status: response.status, 
        data: data 
      });
    })
    .catch((error) => {
      console.error("Extension: Fetch error:", error);
      sendResponse({ success: false, error: error.message });
    });
    
    return true; // Keep message channel open for async response
  }
});

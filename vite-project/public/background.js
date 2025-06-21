
// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check if the message is from your content script and has the correct action
  if (request.action === "setLeetcodeTitle") {
    const title = request.leetcodeTitle;
    if (title && title !== "No Title Found") {
      console.log("Background script: Received title and setting storage:", title);
      chrome.storage.local.set({ leetcodeTitle: title }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error setting storage:", chrome.runtime.lastError);
        } else {
          console.log("Background script: Title stored successfully.");
        }
      });
    }
  }
  // You can send a response back if needed, but not strictly necessary here
  // sendResponse({ status: "received" });
});
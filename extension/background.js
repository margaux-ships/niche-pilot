/**
 * Background Service Worker for NichePilot
 * Handles extension lifecycle and message routing
 */

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('NichePilot extension installed');
});

// Handle messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStorage') {
    chrome.storage.local.get(request.keys, (result) => {
      sendResponse(result);
    });
    return true; // Keep channel open for async response
  }
  
  if (request.action === 'setStorage') {
    chrome.storage.local.set(request.data, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});


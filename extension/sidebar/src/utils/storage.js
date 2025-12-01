/**
 * Chrome Storage Utility
 * Handles storage operations for the extension
 */

export const getStorage = (keys) => {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(keys, (result) => {
        resolve(result);
      });
    } else {
      resolve({});
    }
  });
};

export const setStorage = (data) => {
  return new Promise((resolve) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set(data, () => {
        resolve({ success: true });
      });
    } else {
      resolve({ success: false });
    }
  });
};


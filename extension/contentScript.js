/**
 * Content Script for NichePilot
 * Injects the sidebar UI into x.com pages
 * Ensures sidebar loads only once per page
 */

(function() {
  'use strict';

  // Prevent multiple injections
  if (window.nichePilotInjected) {
    return;
  }
  window.nichePilotInjected = true;

  // Create sidebar container
  const sidebar = document.createElement('div');
  sidebar.id = 'nichepilot-sidebar';
  sidebar.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 360px;
    height: 100vh;
    background: #ffffff;
    border-left: 1px solid #e5e5e5;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
    z-index: 9999;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  `;

  // Adjust main content to make room for sidebar
  const adjustMainContent = () => {
    const mainContent = document.querySelector('[role="main"]');
    if (mainContent) {
      mainContent.style.marginRight = '360px';
    }
  };

  // Inject sidebar when DOM is ready
  const injectSidebar = () => {
    if (document.body) {
      document.body.appendChild(sidebar);
      adjustMainContent();
      
      // Load React app into sidebar
      loadSidebarApp();
    } else {
      setTimeout(injectSidebar, 100);
    }
  };

  // Load the React sidebar application
  const loadSidebarApp = () => {
    // Create iframe to isolate React app from X's page context
    const iframe = document.createElement('iframe');
    iframe.id = 'nichepilot-iframe';
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `;
    iframe.src = chrome.runtime.getURL('sidebar-dist/index.html');
    sidebar.appendChild(iframe);
  };

  // Start injection
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSidebar);
  } else {
    injectSidebar();
  }

  // Adjust on navigation (X uses SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      adjustMainContent();
    }
  }).observe(document, { subtree: true, childList: true });

})();


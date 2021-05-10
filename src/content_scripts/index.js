import * as browser from 'webextension-polyfill';

console.log('Content scripts has loaded');

// const script = document.createElement('script');
// script.setAttribute('type', 'module');
// script.setAttribute('src', browser.extension.getURL('crawler_Target_ProductPageHandler.js'));
// const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
// head.insertBefore(script, head.lastChild);

browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.command == 'SetName') {
    console.log('SetName!');
  }
  console.log(message);
  console.log(sender);
  console.log(sendResponse);
  // Handle message.
  // In this example, message === 'whatever value; String, object, whatever'
});

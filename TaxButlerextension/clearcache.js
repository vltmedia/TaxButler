localStorage.removeItem('taxbutler');

var msg = { command: 'processdone', result: 'Cleared Taxbutler Cache', data: localStorage.getItem('taxbutler')};
    chrome.runtime.sendMessage(msg);
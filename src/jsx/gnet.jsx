// Gistom networking library.

// Open Url in default browser.
function openUrl(url){
  const shell = require('electron').shell;
  shell.openExternal(url);
}

// Copy the Url to clipboard and call callback.
function copyToClipboard(url, callback){
  loadUrlData(url, function(data){
    const {clipboard} = require('electron')
    console.log('Data loaded from url: ' + url)
    clipboard.writeText(data);
    if(callback){
      callback(data);
    }
  });
}

// Make XMLHttpRequest request and callback when request is successful.
function loadUrlData(url, callback){
  console.log('Loading data from url: ' + url);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log("Received successful response, calling callback.")
      callback(xhr.responseText);
    } else {
      console.log("Request failed to load the data." + xhr.status);
    }
  };
  xhr.send();
}

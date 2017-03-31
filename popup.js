document.addEventListener('DOMContentLoaded', function() {
    
  // make video fullscreen
  var fullscreenBtn = document.getElementById('fullscreen');
  fullscreenBtn.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
    
        // Send a request to the content script.
        chrome.tabs.sendRequest(tab.id, {action: "fullscreenVideo"}, function(response) {
            console.log(response.msg);
        });               
    });
  }, false);
  
  // change text size  
  var textResizerBtn = document.getElementById("text-size");
    textResizerBtn.addEventListener('click', function(event) {

        chrome.tabs.getSelected(null, function(tab) {
        
            // Send a request to the content script.
            chrome.tabs.sendRequest(tab.id, {action: "textSize"}, function(response) {
                console.log(response.msg);
            });               
        });
    }, false);
    
  // highlights titles
  var highlightTitlesBtn = document.getElementById("highlight-titles");
    highlightTitlesBtn.addEventListener('click', function(event) {

        chrome.tabs.getSelected(null, function(tab) {
        
            // Send a request to the content script.
            chrome.tabs.sendRequest(tab.id, {action: "highlightTitles"}, function(response) {
                console.log(response.msg);
            });               
        });
    }, false);
}, false);




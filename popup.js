document.addEventListener('DOMContentLoaded', function() {
    
  // make video fullscreen
  var checkPageButton = document.getElementById('fullscreen');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
    
        // Send a request to the content script.
        chrome.tabs.sendRequest(tab.id, {action: "fullscreenVideo"}, function(response) {
            console.log(response.msg);
        });               
    });
  }, false);
  
  // change text size  
  var textResizer = document.getElementById("text-size");
    textResizer.addEventListener('click', function(event) {

        chrome.tabs.getSelected(null, function(tab) {
        
            // Send a request to the content script.
            chrome.tabs.sendRequest(tab.id, {action: "textSize"}, function(response) {
                console.log(response.msg);
            });               
        });
    }, false);
}, false);

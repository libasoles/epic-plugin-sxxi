document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
    
        // Send a request to the content script.
        chrome.tabs.sendRequest(tab.id, {action: "fullscreenVideo"}, function(response) {
            console.log(response.msg);
        });       
    });
  }, false);
}, false);

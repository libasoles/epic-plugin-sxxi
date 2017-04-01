document.addEventListener('DOMContentLoaded', function() {
    
  // make video fullscreen
  var fullscreenBtn = document.getElementById('fullscreen');
  actionHelper.createClickListener(fullscreenBtn, "fullscreenVideo", function(response) {
                console.log(response.msg);
            });

  // change text size  
  var textResizerBtn = document.getElementById("text-size");
  actionHelper.createClickListener(textResizerBtn, "textSize", function(response) {
                console.log(response.msg);
            });
    
  // highlights titles
  var highlightTitlesBtn = document.getElementById("highlight-titles");
  actionHelper.createClickListener(highlightTitlesBtn, "highlightTitles", function(response) {
                console.log(response.msg);
            });
    
  // improve arrows
  var improveArrowsBtn = document.getElementById("improve-arrows");
  actionHelper.createClickListener(improveArrowsBtn, "improveArrows", function(response) {
                console.log(response.msg);
            });
           
  // improve forum
  var improveForumBtn = document.getElementById("improve-forum");
  actionHelper.createClickListener(improveForumBtn, "improveForum", function(response) {
                console.log(response.msg);
            });
    
}, false);

let actionHelper = {

  /**
   * Creates an event listener 
   * Send a message to content script
   * 
   * @param  {dom element}  target     form element 
   * @param  {string}       eventName  ie: 'click'
   * @param  {string}       actionName arbitrary name for message
   * @param  {Function}     callback   handle content-script response
   * @return {[type]}              [description]
   */
  createListener: function (target, eventName, actionName, callback) {

    target.addEventListener(eventName, function(event) {

        chrome.tabs.getSelected(null, function(tab) {
        
            // Send a request to the content script.
            chrome.tabs.sendRequest(tab.id, {action: actionName}, callback);               
        });
    }, false);
  },

  createClickListener: function (target, actionName, callback) {

    this.createListener(target, 'click', actionName, callback);
  }
}

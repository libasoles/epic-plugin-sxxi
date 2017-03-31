chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    
    let response = { msg: null }; // defaults to nothing
        
    console.log(request.action, request);
        
    /**
     * Let's try to find to find the video in some different scenarios.
     */
    switch (request.action) 
    {
        case "fullscreenVideo":        
            var msg = makeVideoFullscreen();
            response = { msg: msg };
            break;
            
        case "textSize":        
            var msg = changeTextSize(request);
            response = { msg: msg };
            break;
            
        default:
            break;    
    }
    
    sendResponse(response); 
});

function makeVideoFullscreen() {
    
    var elem; // object containing the url
    var src; // the actual url of the resource
    
    // access main iframe 
    var iframe = document.getElementById('contentBody');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

    // try to detect video in different scenarios
    elem = innerDoc.getElementById('myElementVideo');
    if(elem != null) {
        
        /** 
         * can't trigger swf fullscreen mode from js
         * so, override main frame content with flash/swf content
        */
        iframe = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;
        iframe.document.open();
        iframe.document.write(elem.outerHTML);
        iframe.document.close();
        
    } else {
        
        // access second iframe
        iframe = innerDoc.getElementById('InnerUrlId');
        innerDoc = iframe.contentDocument || iframe.contentWindow.document;

        // get video iframe
        elem = innerDoc.getElementsByTagName('iframe')[0];
        
        // get video source
        src = elem.src;
        
        // open video in new window, fullscreen
        window.open(src);
    } 
    
    return "Done";
}

function changeTextSize(request) {
      
    var iframe = document.getElementById("contentBody");   
    
    iframe = iframe.contentDocument || iframe.contentWindow.document;
    
    iframe = iframe.getElementById("rawContent");
    
    iframe = iframe.contentDocument || iframe.contentWindow.document;
    
    var page = iframe.getElementById("forum_page");
    
    if(page != null) {
                  
        if(iframe.body.classList.contains("text-resized"))
            return true;
        
        var sheet = iframe.createElement('style');
        sheet.innerHTML = "body.text-resized #message-tree span,\n" 
                        + "body.text-resized #message-tree div {\n"
                        + "    font-size: 17px !important;\n"
                        + "}";

        iframe.head.appendChild(sheet); // append in head
        /*
        var url = chrome.extension.getURL('content-script.css');   
        var cssLink = document.createElement("link");
        cssLink.href = url; 
        cssLink.rel = "stylesheet"; 
        cssLink.type = "text/css"; 
        iframe.body.appendChild(cssLink);        
        */
        iframe.body.classList.add("text-resized");      
    }    
    
    return true; 
}




chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    
    /**
     * Let's try to find to find the video in some different scenarios.
     */
    if (request.action == "fullscreenVideo") {

        var elem; // object containing the url
        var src; // the actual url of the resource
        
        // access main iframe 
        var iframe = document.getElementById('contentBody');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

        // try to detect video in different scenarios
        elem = innerDoc.getElementById('myElementVideo');
        if(elem != null) {
            
            /** override main frame content with flash content
             * (can't trigger swf fullscreen mode from js) 
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
        
        sendResponse({
            msg: "Done"
        });
    } else {
        sendResponse({}); // Send nothing..
    }
});

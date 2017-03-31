chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    
    let response = { msg: null }; // defaults to nothing
        
    console.log(request.action, request);
        
    /**
     * Let's try to find to find the video in some different scenarios.
     */
    switch (request.action) 
    {
        case "fullscreenVideo":        
            response.msg = video.makeVideoFullscreen();
            break;
            
        case "textSize":        
            response.msg = forum.changeTextSize(request);
            break;
            
        case "highlightTitles":
            response.msg = forum.highlightTitles(request);
            break;
            
        default:
            break;    
    }
    
    sendResponse(response); 
});

/**
 * Video feaures
 */
let video = {
    
    makeVideoFullscreen: function() {
        
        let elem; // object containing the url
        let src; // the actual url of the resource
        
        // access main iframe 
        let iframe = document.getElementById('contentBody');
        let innerDoc = iframe.contentDocument || iframe.contentWindow.document;

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
}

/**
 * Forum features
 */
let forum = {
    
    getPageIframe: function() {
        
        let iframe = document.getElementById("contentBody");   
        
        iframe = iframe.contentDocument || iframe.contentWindow.document;
        
        iframe = iframe.getElementById("rawContent");
        
        iframe = iframe.contentDocument || iframe.contentWindow.document;
        
        let page = iframe.getElementById("forum_page");
        
        // assure it's the correct page
        if(page != null) {
                    
            return iframe;   
        }    
        
        return null; 
    },    
    
    changeTextSize: function (request) {
    
        let iframe = this.getPageIframe();
        
        let page = iframe.getElementById("forum_page");
        
        if(page != null) {
                    
            if(iframe.body.classList.contains("text-resized"))
                return true;
            
            let sheet = iframe.createElement('style');
            sheet.innerHTML = "body.text-resized #message-tree span,\n" 
                            + "body.text-resized #message-tree div {\n"
                            + "    font-size: 17px !important;\n"
                            + "}";
            
            iframe.head.appendChild(sheet); // append in head

            iframe.body.classList.add("text-resized");      
        }    
        
        return true; 
    },    
    
    highlightTitles: function (request) {
    
        let iframe = this.getPageIframe();
        
        let page = iframe.getElementById("forum_page");
        
        if(page != null) {                   
            
            let sheet = iframe.createElement('style');
    
            sheet.innerHTML = "#message-tree .msg_summary_line {\n"
                            + "     background-color: #bcf;\n"
                            + "}";

            iframe.head.appendChild(sheet); // append in head    
        }    
        
        return true; 
    }
}



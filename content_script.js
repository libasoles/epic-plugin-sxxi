chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    
    let response = { msg: null }; // defaults to nothing
        
    console.log("Request: ", request.action, request);
        
    /**
     * Call to proper method
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
            
        case "improveArrows":
            response.msg = forum.improveArrows(request);
            break;  
            
        case "improveForum":
            forum.changeTextSize(request);
            forum.highlightTitles(request);
            forum.improveArrows(request);
            forum.improveButtons(request);            
            forum.improveFilters(request);
            frames.highlightFrame(request);
            response.msg = 1;
            break;   

         case "improveTP":
            tp.changeTextSize(request);
            frames.highlightFrame(request);
            response.msg = 1;
            break; 

        default:
            break;    
    }
    
    console.log("Response: ", response);
    
    sendResponse(response); 
});

/**
 * Video features
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
        
        let iframe = frames.getPageIframe();

        let page = iframe.getElementById("forum_page");
        
        // assure it's the correct page
        if(page != null) {
                    
            return iframe;   
        }    
        
        return null; 
    },    
    
    changeTextSize: function (request) {
    
        let iframe = this.getPageIframe();
        
        if(iframe != null) {
                    
            if(iframe.body.classList.contains("text-resized"))
                return true;
            
            let sheet = iframe.createElement('style');
            
            sheet.innerHTML = `
                body.text-resized #message-tree p,
                body.text-resized #message-tree span,
                body.text-resized #message-tree div {
                    font-size: 17px !important;
                    font-family: Arial !important;
                }
            `;
            
            iframe.head.appendChild(sheet); // append in head

            iframe.body.classList.add("text-resized");      
        }    
        
        return true; 
    },    
    
    highlightTitles: function (request) {
    
        let iframe = this.getPageIframe();
        
        if(iframe != null) {                   
            
            if(iframe.body.classList.contains("titles-highlighted"))
                return true;
            
            let sheet = iframe.createElement('style');
    
            sheet.innerHTML = `
                #message-tree .msg_summary_line {
                    background-color: #bcf;
                    color: #565050;
                }
            `;

            iframe.head.appendChild(sheet); // append in head  
            
            iframe.body.classList.add("titles-highlighted");     
        }    
        
        return true; 
    },    
    
    improveArrows: function (request) {
    
        let iframe = this.getPageIframe();
       
        if(iframe != null) {                   
            
            if(iframe.body.classList.contains("arrows-improved"))
                return true;
            
            let sheet = iframe.createElement('style');
    
            sheet.innerHTML = `
                #forum_page .x-tree-no-lines .x-tree-ec-icon {
                    margin: 0 20px;
                    border: solid;
                    background: #fff;
                    border-width: 0px 3px 3px 0 !important;   
                    width: 10px;
                    height: 10px;                    
                    padding-top: 0 !important;
                    border-color: #2d67b0;
                }

                    #forum_page .x-tree-no-lines .x-tree-elbow,
                    #forum_page .x-tree-no-lines .x-tree-elbow-end {
                        border: none !important;
                    }
                    
                    #forum_page .x-tree-no-lines .x-tree-elbow-plus,
                    #forum_page .x-tree-no-lines .x-tree-elbow-end-plus {       
                        transform: rotate(45deg);
                        -webkit-transform: rotate(45deg);
                        margin-top: -4px !important;
                    }

                    #forum_page .x-tree-no-lines .x-tree-elbow-minus,
                    #forum_page .x-tree-no-lines .x-tree-elbow-end-minus {       
                        transform: rotate(-135deg);
                        -webkit-transform: rotate(-135deg);
                        margin-top: 9px !important;
                    }
            `;

            iframe.head.appendChild(sheet); // append in head  
            
            iframe.body.classList.add("arrows-improved");
        }    
        
        return true; 
    },
    
    improveButtons: function () {
        
        let iframe = this.getPageIframe();
       
        if(iframe != null) {                   
            
            if(iframe.body.classList.contains("buttons-improved"))
                return true;
            
            let sheet = iframe.createElement('style');
    
            sheet.innerHTML = `
                #message-tree .msg_action {      
                    padding-top: 5px;
                    padding-bottom: 5px;
                }
                
                #message-tree .x-tree-node a:hover {      
                    color: #454545 !important;
                }
                
                #forum_page .x-tree-no-lines .x-tree-elbow-plus {  
                    margin-top: -13px !important;
                }

                #forum_page .x-tree-no-lines .x-tree-elbow-minus {   
                    margin-top: 2px !important;
                }

                .buttonText_db {
                    padding-top: 0;
                    line-height: 22px;
                }

                #divPdf {
                    display: none;
                }
            `;

            iframe.head.appendChild(sheet); // append in head    
            
            iframe.body.classList.add("buttons-improved");
        }    
        
        return true;             
    },
   
    improveFilters: function(request) {

        let iframe = this.getPageIframe();
       
        if(iframe != null) {                   
            console.log("filters ok");
            if(iframe.body.classList.contains("improved-filters"))
                return true;
            
            let sheet = iframe.createElement('style');
    
            sheet.innerHTML = `
                #div_labelFilterByParticipant,
                #Participants {      
                    display: none;
                }

                #divRead,
                #ext-gen44 {
                    width: 110px !important;
                }

                #comboRead {
                    width: 85px !important;
                }

                #ext-comp-1008 {
                    background: url(/Images/at_a_glance_e.jpg) no-repeat scroll 0 #2d67b0;
                    padding-right: 5px;
                    width: 150px;
                    text-align: right;
                    color: white;
                    border-top-right-radius: 3px;
                    border-top-left-radius: 3px;
                }
            `;

            iframe.head.appendChild(sheet); // append in head  
            
            iframe.body.classList.add("improved-filters");
        }    
        
        return true;         
    }
}

let tp = {
    
    changeTextSize: function (request) {
    
        let iframe = frames.getPageIframe();
        
        if(iframe != null) {
                    
            if(iframe.body.classList.contains("text-resized"))
                return true;
            
            let sheet = iframe.createElement('style');
            
            sheet.innerHTML = `
                p,
                span,
                div {
                    font-family; Arial !important;
                    font-size: 20px !important;
                }
            `;
            
            iframe.head.appendChild(sheet); // append in head

            iframe.body.classList.add("text-resized");      
        }    
        
        return true; 
    },    
}

let frames = {

    getMainIframe: function() {
        
        let iframe = document.getElementById("contentBody");   
        
        iframe = iframe.contentDocument || iframe.contentWindow.document;
        
        return iframe;
    },
    
    getPageIframe: function() {
        
        let iframe = this.getMainIframe();
        
        // get secondary iframe
        iframe = iframe.getElementById("rawContent");        
        iframe = iframe.contentDocument || iframe.contentWindow.document;
        
        return iframe;   
    }, 
    highlightFrame: function (request) {
    
        let iframe = this.getMainIframe();
       
        if(iframe != null) {                   
            
            if(iframe.body.classList.contains("frame-highlighted"))
                return true;
            
            let sheet = iframe.createElement('style');
    
            sheet.innerHTML = `
                body > div {      
                    background: #ccc; /* For browsers that do not support gradients */
                    background: -webkit-linear-gradient(#ccc, #aaa); /* For Safari 5.1 to 6.0 */
                    background: -o-linear-gradient(#ccc, #aaa); /* For Opera 11.1 to 12.0 */
                    background: -moz-linear-gradient(#ccc, #aaa); /* For Firefox 3.6 to 15 */
                    background: linear-gradient(#ccc, #aaa); /* Standard syntax */
                }
            `;

            iframe.head.appendChild(sheet); // append in head  
            
            iframe.body.classList.add("frame-highlighted");
        }    
        
        return true; 
    },
}
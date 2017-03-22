chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "fullscreenVideo") {

        // access first iframe 
        var iframe = document.getElementById('contentBody');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

        // access second iframe
        iframe = innerDoc.getElementById('InnerUrlId');
        innerDoc = iframe.contentDocument || iframe.contentWindow.document;

        // get video iframe
        iframe = innerDoc.getElementById('video720').getElementsByTagName('iframe')[0];

        // open video in new window, fullscreen
        window.open(iframe.src);

        sendResponse({
            msg: "Opened video in new window"
        });
    } else {
        sendResponse({}); // Send nothing..
    }
});

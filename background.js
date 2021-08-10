var host = "*://*.youtube.com";
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return {redirectUrl: "https://youtube.com/feed/subscriptions"};
    },
    {
        urls: [
            "*://*.youtube.com/"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);
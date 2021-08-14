// YouTube
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

// Twitter
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return {redirectUrl: "https://twitter.com/"};
    },
    {
        urls: [
            "*://twitter.com/explore"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);
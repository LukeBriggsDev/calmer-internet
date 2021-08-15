// Settings
settings = {}
let getting = chrome.storage.sync.get([
    "YTHomeRedirect",

    "TwitterExploreRedirect",

    "InstaExploreRedirect"
], function (result){
    settings = {
        "YTHomeRedirect": result.YTHomeRedirect,

        "TwitterExploreRedirect": result.TwitterExploreRedirect,

        "InstaExploreRedirect": result.InstaExploreRedirect
    }
})

// YouTube
    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            if(!settings["YTHomeRedirect"]) {
                return {redirectUrl: "https://youtube.com/feed/subscriptions"};
            }
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
        function (details) {
            if(!settings["TwitterExploreRedirect"]) {
                return {redirectUrl: "https://twitter.com/"};
            }
        },
        {
            urls: [
                "*://twitter.com/explore/*",
                "*://twitter.com/explore"
            ],
            types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
        },
        ["blocking"]
    );

// Instagram
    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            if(!settings["InstaExploreRedirect"]) {
                return {redirectUrl: "https://instagram.com/"};
            }
        },
        {
            urls: [
                "*://*.instagram.com/explore/",
            ],
            types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
        },
        ["blocking"]
    );

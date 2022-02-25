// Settings
settings = {}
// Button clicked
chrome.action.onClicked.addListener(function (tab){
    chrome.runtime.openOptionsPage();
});


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

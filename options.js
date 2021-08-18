function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
        YTHomeLinks: document.querySelector("#YTHomeLinks").checked,
        YTHomeRedirect: document.querySelector("#YTHomeRedirect").checked,
        YTExploreLinks: document.querySelector("#YTExploreLinks").checked,
        YTComments: document.querySelector("#YTComments").checked,
        YTWatchNext: document.querySelector("#YTWatchNext").checked,
        YTLiveChat: document.querySelector("#YTLiveChat").checked,
        YTEndScreenVideoWall: document.querySelector("#YTEndScreenVideoWall").checked,

        TwitterTrendingBar: document.querySelector("#TwitterTrendingBar").checked,
        TwitterExploreLinks: document.querySelector("#TwitterExploreLinks").checked,
        TwitterExploreRedirect: document.querySelector("#TwitterExploreRedirect").checked,
        TwitterWhoToFollow: document.querySelector("#TwitterWhoToFollow").checked,
        TwitterTopics: document.querySelector("#TwitterTopics").checked,

        InstaComments: document.querySelector("#InstaComments").checked,
        InstaExploreLinks: document.querySelector("#InstaExploreLinks").checked,
        InstaFeedComments: document.querySelector("#InstaFeedComments").checked,
        InstaExploreRedirect: document.querySelector("#InstaExploreRedirect").checked,
    });
}

function restoreOptions() {

    function setCurrentChoices(result) {
        document.querySelector("#YTHomeLinks").checked = result.YTHomeLinks;
        document.querySelector("#YTHomeRedirect").checked = result.YTHomeRedirect;
        document.querySelector("#YTExploreLinks").checked = result.YTExploreLinks;
        document.querySelector("#YTComments").checked = result.YTComments;
        document.querySelector("#YTWatchNext").checked = result.YTWatchNext;
        document.querySelector("#YTLiveChat").checked = result.YTLiveChat;
        document.querySelector("#YTEndScreenVideoWall").checked = result.YTEndScreenVideoWall

        document.querySelector("#TwitterTrendingBar").checked = result.TwitterTrendingBar;
        document.querySelector("#TwitterExploreLinks").checked = result.TwitterExploreLinks;
        document.querySelector("#TwitterExploreRedirect").checked = result.TwitterExploreRedirect;
        document.querySelector("#TwitterWhoToFollow").checked = result.TwitterWhoToFollow;
        document.querySelector("#TwitterTopics").checked = result.TwitterTopics;

        document.querySelector("#InstaComments").checked = result.InstaComments;
        document.querySelector("#InstaExploreLinks").checked = result.InstaExploreLinks;
        document.querySelector("#InstaFeedComments").checked = result.InstaFeedComments;
        document.querySelector("#InstaExploreRedirect").checked = result.InstaExploreRedirect;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = chrome.storage.sync.get([
        "YTHomeLinks",
        "YTHomeRedirect",
        "YTExploreLinks",
        "YTComments",
        "YTWatchNext",
        "YTLiveChat",
        "YTEndScreenVideoWall",

        "TwitterTrendingBar",
        "TwitterExploreLinks",
        "TwitterExploreRedirect",
        "TwitterWhoToFollow",
        "TwitterTopics",

        "InstaComments",
        "InstaExploreLinks",
        "InstaFeedComments",
        "InstaExploreRedirect"
        ], setCurrentChoices)
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
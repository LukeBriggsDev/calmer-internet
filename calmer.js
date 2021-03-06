console.log("LOADED CALMER INTERNET ON " + window.location.hostname);
// Settings
settings = {}

// noinspection JSVoidFunctionReturnValueUsed
let getting = chrome.storage.sync.get([
    "YTHomeLinks",
    "YTShortsLinks",
    "YTExploreLinks",
    "YTComments",
    "YTWatchNext",
    "YTLiveChat",
    "YTEndScreenVideoWall",
    "YTSearchSuggestions",

    "TwitterTrendingBar",
    "TwitterExploreLinks",
    "TwitterWhoToFollow",
    "TwitterTopics",

    "InstaComments",
    "InstaExploreLinks",
    "InstaFeedComments"
], function (result) {
    settings = {
        "YTHomeLinks": result.YTHomeLinks,
        "YTShortsLinks": result.YTShortsLinks,
        "YTHomeRedirect": result.YTHomeRedirect,
        "YTExploreLinks": result.YTExploreLinks,
        "YTComments": result.YTComments,
        "YTWatchNext": result.YTWatchNext,
        "YTLiveChat": result.YTLiveChat,
        "YTEndScreenVideoWall": result.YTEndScreenVideoWall,
        "YTSearchSuggestions": result.YTSearchSuggestions,

        "TwitterTrendingBar": result.TwitterTrendingBar,
        "TwitterExploreLinks": result.TwitterExploreLinks,
        "TwitterExploreRedirect": result.TwitterExploreRedirect,
        "TwitterWhoToFollow": result.TwitterWhoToFollow,
        "TwitterTopics": result.TwitterTopics,

        "InstaComments": result.InstaComments,
        "InstaExploreLinks": result.InstaExploreLinks,
        "InstaFeedComments": result.InstaFeedComments
    }
})
function getElementsToRemove(){
    var elementsToRemove = {};
    // YouTube
    if (window.location.hostname === "www.youtube.com" || window.location.hostname === "m.youtube.com"){

        if(!settings["YTHomeLinks"]){
            elementsToRemove["homeLinks"] = document.querySelectorAll("a[href='/']")
        }
        if(!settings["YTShortsLinks"]){
            elementsToRemove["shortsLinks"] = document.querySelectorAll("a[title='Shorts']")
        }
        if(!settings["YTExploreLinks"]){
            elementsToRemove["exploreLinks"] = document.querySelectorAll("a[href='/feed/explore']")
        }
        if(!settings["YTComments"]){
            elementsToRemove["comments"] = document.getElementsByClassName("ytd-comments")
            elementsToRemove["commentsMobile"] = document.getElementsByTagName("ytm-comments-entry-point-header-renderer")
        }
        if(!settings["YTWatchNext"]){
            elementsToRemove["watchNext"] = document.getElementsByClassName("ytd-watch-next-secondary-results-renderer")
            elementsToRemove["watchNextMobile"] = document.querySelectorAll("ytm-item-section-renderer[section-identifier='related-items']")
        }
        if(!settings["YTLiveChat"]){
            elementsToRemove["liveChat"] = document.getElementsByTagName("ytd-live-chat-frame")
        }
        if(!settings["YTEndScreenVideoWall"]){
            elementsToRemove["endScreenVideoWall"] = document.getElementsByClassName("videowall-endscreen")
        }

        // Elements that might throw undefined errors
        try{
            if(!settings["YTHomeLinks"]) {
                elementsToRemove["homeMobile"] = [document.getElementsByClassName("pivot-bar-item-tab pivot-w2w")[0].parentElement]
                elementsToRemove["trendingMobile"] = [document.getElementsByClassName("pivot-bar-item-tab pivot-trending")[0].parentElement]
            }
        }
        catch(e){}
        try {
            if(!settings["YTShortsLinks"]) {
                elementsToRemove["shortsLinks"] = [document.getElementsByClassName("pivot-bar-item-tab pivot-shorts")[0].parentElement]
            }
        } catch(e){}
        try {
            if(!settings["YTSearchSuggestions"]) {
                if (window.location.href.startsWith("https://www.youtube.com/results")) {
                    elementsToRemove["searchSuggestions"] = document.querySelectorAll("ytd-search>div[id='container']>ytd-two-column-search-results-renderer>div[id='primary']>ytd-section-list-renderer>div[id='contents']>ytd-item-section-renderer>div[id='contents']>ytd-shelf-renderer>div[id='dismissible']")
                }
            }
        } catch (e) {}
    }

    //Twitter
    if (window.location.hostname === "twitter.com" || window.location.hostname === "mobile.twitter.com"){
        if(!settings["TwitterTrendingBar"]){
            elementsToRemove["trendingBar"] = document.querySelectorAll("div[data-testid='sidebarColumn'] > div > div:nth-child(2) > div > div > div > div:nth-child(2)")
        }
        if(!settings["TwitterExploreLinks"]){
            elementsToRemove["exploreLinks"] = document.querySelectorAll("a[href='/explore']")
        }
        if(!settings["TwitterWhoToFollow"]){
            elementsToRemove["miscStyling"] = document.getElementsByClassName("css-1dbjc4n r-1867qdf r-1phboty r-rs99b7 r-1ifxtd0 r-1bro5k0 r-1udh08x")
            elementsToRemove["whoToFollow"] = document.querySelectorAll("aside[aria-label='Who to follow']")
        }
        if(!settings["TwitterTopics"]){
            elementsToRemove["topics"] = document.querySelectorAll("div[aria-label='Timeline: ']")
        }
    }

    //Instagram
    if (window.location.hostname === "www.instagram.com"){
        if(!settings["InstaComments"]){
            elementsToRemove["comments"] = document.getElementsByClassName("Mr508 ")
        }

        // Elements that might throw undefined errors

        //Explore Links
        if(!settings["InstaExploreLinks"]) {

            try {
                exploreLinkParents = []
                for (element of document.querySelectorAll("a[href='/explore/']")) {
                    exploreLinkParents.push(element.parentElement)
                }
                for (element of document.querySelectorAll("a[href='/explore/people/']")) {
                    exploreLinkParents.push(element.parentElement.parentElement)
                }
                elementsToRemove["exploreLinkParents"] = exploreLinkParents
            } catch (e) {
                console.log(e)
            }
        }
        // Comments below posts in feed
        if(!settings["InstaFeedComments"]) {
            try {
                feedComments = []
                for (element of document.getElementsByClassName("r8ZrO")) {
                    feedComments.push(element.parentElement.parentElement);
                }
                elementsToRemove["feedComments"] = feedComments;
            } catch (e) {

            }
        }
    }
    
    return elementsToRemove;

}
function main(){
    observeBodyRemove();


    function observeBodyRemove(){
        // Select the node that will be observed for mutations
        var targetNode = document.querySelector('body');

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function(mutationsList, observer) {
            elementsToRemove = getElementsToRemove();
            for(key in elementsToRemove){
                for (element of elementsToRemove[key]){
                    try {
                        element.remove();
                    }
                    catch(e){
                    }
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }

}

main()


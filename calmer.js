console.log("LOADED CALMER INTERNET ON " + window.location.hostname);

function getElementsToRemove(){
    var elementsToRemove; 
    // YouTube
    if (window.location.hostname == "www.youtube.com" || window.location.hostname == "m.youtube.com"){
        // Set mobile flags
        if(window.location.href == "https://m.youtube.com/"){
            var IS_MOBILE = true;
        }
        else{
            var IS_MOBILE = false
        }
        // Redirect on homepage
        if (window.location.href == "https://www.youtube.com/" || window.location.href == "https://m.youtube.com/"){

            if (IS_MOBILE){
                window.location.replace("http://m.youtube.com/feed/subscriptions/");
            }
            else{
                window.location.replace("http://www.youtube.com/feed/subscriptions/");
            }
        }
        else {
            
            elementsToRemove = {
                "homeLinks": document.querySelectorAll("a[href='/']"),
                "exploreLinks": document.querySelectorAll("a[href='/feed/explore']"),
                "comments": document.getElementsByClassName("ytd-comments"),
                "commentsMobile": document.getElementsByTagName("ytm-comments-entry-point-header-renderer"),
                "watchNext": document.getElementsByClassName("ytd-watch-next-secondary-results-renderer"),
                "watchNextMobile": document.querySelectorAll("ytm-item-section-renderer[section-identifier='related-items']")
            }

            console.log(document.getElementsByClassName("ytd-playlist-panel-renderer").length)
            // Remove right panel when not in a playlist
            if (!IS_MOBILE && !window.location.href.includes("&list")){
                elementsToRemove["rightPanel"] = [document.getElementById("secondary")]
            }

            // Elements that might throw undefined errors
            try{
            elementsToRemove["homeMobile"] = [document.getElementsByClassName("pivot-bar-item-tab pivot-w2w")[0].parentElement]
            elementsToRemove["trendingMobile"] = [document.getElementsByClassName("pivot-bar-item-tab pivot-trending")[0].parentElement]
            }
            catch(e){
            
            }
        }
    }

    //Twitter
    if (window.location.hostname == "twitter.com" || window.location.hostname == "mobile.twitter.com"){
        elementsToRemove = {
            "trendingBar": document.querySelectorAll("div[aria-label='Timeline: Trending now']"),
            "exploreLinks": document.querySelectorAll("a[href='/explore']"),
            "whoToFollow": document.querySelectorAll("aside[aria-label='Who to follow']"),
            "topics": document.querySelectorAll("div[aria-label='Timeline: ']"),
            "miscStyling": document.getElementsByClassName("css-1dbjc4n r-1867qdf r-1phboty r-rs99b7 r-1ifxtd0 r-1bro5k0 r-1udh08x")
        }
    }

    //Instagram
    if (window.location.hostname == "www.instagram.com"){
        elementsToRemove = {
            "comments": document.getElementsByClassName("Mr508 ")
        }
        // Elements that might throw undefined errors

        //Explore Links
        try{
            exploreLinkParents = []
            for(element of document.querySelectorAll("a[href='/explore/']")){
                exploreLinkParents.push(element.parentElement)
            }
            for(element of document.querySelectorAll("a[href='/explore/people/']")){
                exploreLinkParents.push(element.parentElement.parentElement)
            } 
            elementsToRemove["exploreLinkParents"] = exploreLinkParents
        }
        catch(e){
            console.log(e)
        }
        // Comments below posts in feed
        try{   
            feedComments = []
            for(element of document.getElementsByClassName("r8ZrO")){
                feedComments.push(element.parentElement.parentElement);
            }
            console.log(feedComments);
            elementsToRemove["feedComments"] = feedComments;
        }
        catch(e){
            
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
                    element.remove();
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


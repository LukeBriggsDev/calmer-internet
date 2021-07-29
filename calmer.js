console.log("LOADED CALMER INTERNET ON " + window.location.hostname);

function getElementsToRemove(){
    var elementsToRemove; 
    // YouTube
    if (window.location.href == "https://www.youtube.com/" || window.location.href == "https://m.youtube.com/"){
        window.location.replace("http://youtube.com/feed/subscriptions/");
    }
    else{
        if (window.location.hostname == "www.youtube.com" || window.location.hostname == "m.youtube.com"){
            elementsToRemove = {
                "homeLinks": document.querySelectorAll("a[href='/']"),
                "exploreLinks": document.querySelectorAll("a[href='/feed/explore']"),
                "mobileTrending": document.getElementsByClassName("pivot-trending"),
                "comments": document.getElementsByClassName("ytd-comments") 
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


console.log("LOADED CALMER INTERNET ON " + window.location.hostname);
function cleanup(){
    // YouTube
    function removeYouTubeElements(){
        var homeLinks = "a[href='/']";
        var exploreLinks = "a[href='/feed/explore']";
        var mobileTrending = document.getElementsByClassName("pivot-trending")
        var comments = document.getElementsByClassName("ytd-comments")
        var youtubeElementsToRemove = document.querySelectorAll(`${homeLinks}, ${exploreLinks}`);
        youtubeElementsToRemove.forEach(element => element.remove());
        for(element of comments){element.remove();}
        for(element of mobileTrending){element.parentElement.remove();}  
    }

    if (window.location.hostname == "www.youtube.com" || window.location.hostname == "m.youtube.com"){
        observeBody(removeYouTubeElements);
    }
    console.log(window.location.href);
    if (window.location.href == "https://www.youtube.com/" || window.location.href == "https://m.youtube.com/"){
        window.location.replace("http://youtube.com/feed/subscriptions/");
    }

    // Twitter
    function removeTwitterElements(){
        console.log("TWITTER");
        var homeLinks = "a[href='/home']";
        var trendingBar = "div[aria-label='Timeline: Trending now']";
        var exploreLinks = "a[href='/explore']";
        var whoToFollow = "aside[aria-label='Who to follow']"
        var topics = 'div[aria-label="Timeline: "]'
        var twitterElementsToRemove = document.querySelectorAll(`${exploreLinks}, ${homeLinks},${trendingBar}, ${whoToFollow}, ${topics}`);
        twitterElementsToRemove.forEach(element => element.remove());
        
        // Remove styled box
        var twitterClassesToRemove = document.getElementsByClassName("css-1dbjc4n r-x572qd r-1d6w8o1 r-1867qdf r-1phboty r-rs99b7 r-1ifxtd0 r-1bro5k0 r-1udh08x");
        for(element of twitterClassesToRemove){
            element.remove();
        }  
    }

    if (window.location.hostname == "twitter.com" || window.location.hostname == "mobile.twitter.com"){
        observeBody(removeTwitterElements)
    }


    function observeBody(action){
        // Select the node that will be observed for mutations
        var targetNode = document.querySelector('body');

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function(mutationsList, observer) {
            action();
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }

}

cleanup()


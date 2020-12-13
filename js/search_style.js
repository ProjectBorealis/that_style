function search_style() {
    var searchResults = document.getElementById("MSearchResultsWindow");

    var config = { attributes: true, childList: true, subtree: true };

    var cssLink = "../that_style.css";

    var head = null;
    var customStyle = null;
    var searchDocument = null;

    var updateDocument = function() {
        var old = searchDocument;
        searchDocument = document.getElementById("MSearchResults")
                            .contentWindow.document;

        if (old == searchDocument) {
            return false;
        }

        head = searchDocument.getElementsByTagName("head")[0];

        customStyle = searchDocument.createElement("link");
        customStyle.setAttribute("href", cssLink);
        customStyle.setAttribute("type", "text/css");
        customStyle.setAttribute("rel", "stylesheet");
        return true;
    }

    // Callback function to execute when mutations are observed
    var callback = function() {
        if (updateDocument()) {
            head.appendChild(customStyle);
        }
        setTimeout(callback, 500);
    }

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(() => {
        setTimeout(callback, 100);
    });

    // Start observing the target node for configured mutations
    observer.observe(searchResults, config);
};


$(window).on('load', search_style);

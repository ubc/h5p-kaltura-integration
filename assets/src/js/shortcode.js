const targetNode = document.querySelector('.h5p-iframe');
const config = { attributes: true, childList: false, subtree: false };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(const mutation of mutationsList) {
        if( mutation.attributeName === 'class' && mutation.target.classList.contains('h5p-initialized') ) {
            jQuery(mutation.target).contents().find('head').append("<style>.h5p-element{min-height: 100px;}</style>");
        } 
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
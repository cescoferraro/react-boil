export const runServiceWorker = () => {
    if (document.location.hostname !== "localhost") {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/OneSignalSDKWorker.js').then(function(reg) {
                reg.onupdatefound = function() {
                    var installingWorker = reg.installing;

                    installingWorker.onstatechange = function() {
                        switch (installingWorker.state) {
                            case 'installed':
                                if (navigator.serviceWorker.controller) {
                                    console.log('New or updated content is available.');
                                } else {
                                    console.log('Content is now available offline!');
                                }
                                break;
                            case 'redundant':
                                console.error('The installing service worker became redundant.');
                                break;
                        }
                    };
                };
            }).catch(function(e) {
                console.error('Error during service worker registration:', e);
            });
        }
    }
}

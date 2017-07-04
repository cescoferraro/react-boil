export const runServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/js/sw.js');
        }
}

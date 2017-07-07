export const runServiceWorker = () => {
    if (document.location.hostname !== "localhost") {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
        }
    }
}

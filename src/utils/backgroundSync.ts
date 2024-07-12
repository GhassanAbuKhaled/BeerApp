
export const backgroundSync = async () => {
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      // Register service worker and initiate synchronization
      const registration = await navigator.serviceWorker.register('../serviceWorker.js');
      await registration.sync.register('syncFormData');
    } catch (error) {
      console.error('Error handling offline mode:', error);
    }
  } else {
    // Fallback for browsers that do not support service workers or SyncManager
    console.log('Your browser does not support offline mode.');
  }
}
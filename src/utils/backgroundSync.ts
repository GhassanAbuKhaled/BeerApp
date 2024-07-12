
export const backgroundSync = async () => {
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      // Register service worker and initiate synchronization
      const registration = await navigator.serviceWorker.register('../serviceWorker.js');
      await registration.sync.register('syncFormData');
    } catch (error) {
      console.error('Error handling offline mode:', error);
    }
  }
}
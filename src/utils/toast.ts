import { ref, provide, inject } from 'vue';
import { Toast } from 'bootstrap';

const currentToast = ref<ToastOptions | null>(null);
let toastElement: HTMLElement | null = null;
let toast: Toast;

const initToast = () => { 
  // Retrieve the toast element from the DOM
  toastElement = document.querySelector(".toast");

  // Initialize the toast if the element is found
  if (toastElement) {
    toast = new Toast(toastElement);
  } else {
    console.error("Toast element is not available in the DOM");
  }
};

/**
 * Displays a toast notification.
 * 
 * @param {string} message - The message to display in the toast.
 * @param {number} [duration=30000] - The duration in milliseconds for which the toast will be visible.
 */
const showToast = (
    message: string, 
    duration: number = 30000,
    type: string
  ) => {
    // Set the current toast message and duration
    currentToast.value = { message ,type ,duration };
  
    // Initialize the toast if it hasn't been initialized yet
    if (!toast) {
      initToast();
    }
  
    // Display the toast, ensuring it's hidden first if already visible
    if (toast.isShown()) {
      toast.hide();
      setTimeout(() => { 
        toast.show(); 
      }, 200);
    } else {
      toast.show();
      setTimeout(() => { 
        toast.hide(); 
      }, duration);
    }
  };
  

// Provides the toast service to be used within the application.
export const provideToast = () => {
  provide('toast', {
    showToast,
    currentToast,
  });
};

/**
 * Injects the toast service provided by provideToast.
 * 
 * This function should be used within a component that is a descendant of a component 
 * where provideToast has been called.
 * 
 * @returns {{ showToast: (message: string, duration?: number) => void, currentToast: ToastOptions | null }} - The toast servise object containing showToast function and currentToast state.
 */
export const useToast = () => {
  const toast = inject('toast');
  if (!toast) {
    throw new Error('useToast must be used within a component that has been provided with the toast service.');
  }
  return toast as { showToast: (message: string, duration?: number) => void, currentToast: ToastOptions | null };
};

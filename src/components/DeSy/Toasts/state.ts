import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from './types';

export default {
  toasts: ref<Toast[]>([]),
  addToast(message: string, type?: string) {
    const newToast: Toast = {
      id: uuidv4(),
      message,
      type: type || 'info',
    };
    this.toasts.value.push(newToast);

    // Auto-remove toast
    setTimeout(() => {
      this.removeToast(newToast.id);
    }, 5000);
  },
  removeToast(id: string) {
    this.toasts.value = this.toasts.value.filter(toast => toast.id !== id);
  },
}

import { toast, TypeOptions } from 'react-toastify';

export const showToast = (message: string, type?: TypeOptions) => {
  toast(message, {
    type: type || 'success',
    autoClose: type === 'error' ? false : 8000,
  });
};

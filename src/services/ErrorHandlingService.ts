
import { toast } from 'react-toastify';

export class AppError extends Error {
  constructor(message: string, public code: string, public statusCode?: number) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: any) => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    toast.error(error.message);
    return error;
  }

  // Handle network errors
  if (!navigator.onLine) {
    toast.error('No internet connection');
    return new AppError('No internet connection', 'NETWORK_ERROR');
  }

  // Handle API errors
  if (error.response) {
    const message = error.response.data?.message || 'An error occurred';
    toast.error(message);
    return new AppError(message, 'API_ERROR', error.response.status);
  }

  // Handle other errors
  toast.error('An unexpected error occurred');
  return new AppError('An unexpected error occurred', 'UNKNOWN_ERROR');
};

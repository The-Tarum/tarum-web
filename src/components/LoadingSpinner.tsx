
import React from 'react';
import { theme } from '../theme';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-light border-t-transparent"></div>
  </div>
);

export default LoadingSpinner;

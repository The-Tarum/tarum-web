
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const ErrorBoundaryWrapper = ({ children, fallback }) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetError }) => (
        fallback ? fallback({ error, resetError }) : (
          <div className="min-h-[200px] flex items-center justify-center bg-gray-50">
            <div className="text-center p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-4">{error.message}</p>
              <button
                onClick={resetError}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;


import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error, retry }) => {
  const LoadingState = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {Array(8).fill(null).map((_, index) => (
        <div key={`skeleton-${index}`} className="animate-pulse">
          <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-8">
      <p className="text-red-500 mb-4">{error}</p>
      {retry && (
        <button 
          onClick={retry}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      )}
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {loading ? (
        Array(8).fill(null).map((_, index) => (
          <ProductCard key={`skeleton-${index}`} isLoading={true} />
        ))
      ) : products.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;

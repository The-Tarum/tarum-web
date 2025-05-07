
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error }) => {
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

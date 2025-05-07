
import React from 'react';

import ProductCard from './ProductCard';

const ProductList = ({ products, variant = 'chemical', gridCols = 1 }) => {
  const gridClassName = {
    1: 'grid-cols-2',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[gridCols];

  return (
    <div className={`grid ${gridClassName} gap-4 p-4`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          variant={variant}
        />
      ))}
    </div>
  );
};

export default ProductList;

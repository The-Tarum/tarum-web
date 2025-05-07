
import React from 'react';
import Button from './Button';

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <div className="flex items-center mt-2">
        <span className="text-blue-600">${product.price}/kg</span>
        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-sm">{product.type}</span>
      </div>
      <div className="text-sm text-gray-600 mt-2">
        <div>{product.supplier}</div>
        <div>{product.location}</div>
      </div>
      <div className="mt-4 flex justify-between">
        <Button className="w-full mr-2">Buy Now</Button>
        <Button className="w-full bg-white border-2 border-blue-500 text-blue-500">Get Quote</Button>
      </div>
    </div>
  );
}

export default ProductCard;

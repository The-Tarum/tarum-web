
import React from 'react';

import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product, variant = 'default' }) => {
  if (variant === 'chemical') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-lg"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-[#6CB33F] text-white px-2 py-1 rounded text-sm">
              New
            </span>
          )}
          <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
            <FiShoppingCart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-medium">{product.name}</h3>
          <div className="flex items-center mt-2">
            <img src={product.supplierLogo} alt="" className="w-6 h-6 rounded-full" />
            <span className="ml-2 text-gray-600">{product.supplier}</span>
          </div>
          <div className="flex items-center mt-2">
            <span className="bg-[#4CAF50] text-white px-2 py-1 rounded text-sm">FOB</span>
            <span className="text-blue-600 text-lg font-semibold ml-2">${product.price}/kg</span>
          </div>
          <div className="text-gray-500 text-sm mt-1">
            <span>{product.location}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'simple') {
    return (
      <div className="bg-white rounded-lg p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="text-lg font-bold mt-1">${product.price}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-start space-x-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <div className="mt-1 text-sm text-gray-600">
            <div>{product.supplier} • {product.location}</div>
            <div className="mt-1">Delivery: {product.delivery}</div>
          </div>
          <div className="flex items-center mt-2">
            <span className="bg-[#E8F5E9] text-[#4CAF50] px-2 py-1 rounded text-sm">
              {product.terms}
            </span>
            <span className="text-blue-600 text-lg font-semibold ml-2">
              ${product.price}/kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

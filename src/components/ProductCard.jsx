
import React from 'react';
import { FiShoppingCart, FiImage } from 'react-icons/fi';

const ProductCard = ({ product, variant = 'default', isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
        <div className="relative">
          <div className="w-full h-48 bg-gray-200 rounded-lg"/>
          <div className="absolute bottom-2 right-2 bg-gray-200 w-10 h-10 rounded-full"/>
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"/>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full"/>
            <div className="h-4 bg-gray-200 rounded w-1/2"/>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-6 bg-gray-200 rounded w-16"/>
            <div className="h-6 bg-gray-200 rounded w-24"/>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'chemical') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="relative">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = product.fallbackImage || FiImage;
              }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <FiImage className="w-12 h-12 text-gray-400"/>
            </div>
          )}
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
      <div className="bg-white rounded-lg p-2">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-fit object-cover rounded-lg mb-3 bg-gray-100"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = product.fallbackImage || FiImage;
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
            <FiImage className="w-12 h-12 text-gray-400"/>
          </div>
        )}
        <p className="text-gray-900">{product.name}</p>
        <p className="text-lg font-bold mt-1">${product.price}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-start space-x-4">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-24 h-24 object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = product.fallbackImage || FiImage;
            }}
          />
        ) : (
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            <FiImage className="w-8 h-8 text-gray-400"/>
          </div>
        )}
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

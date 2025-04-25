import React from 'react';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const imageUrl = product?.ProductImages?.[0]?.imageUrl || '/placeholder.png';
  const priceData = product?.ProductPrice || {};
  const hasRange = priceData.lowPrice && priceData.highPrice;
  const priceDisplay = priceData.price
    ? `$${priceData.price.toFixed(2)}`
    : `$${priceData.lowPrice?.toFixed(2) || '0.00'} - $${priceData.highPrice?.toFixed(2) || '0.00'}`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100">
      {/* Image with badge */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </span>
        )}
      </div>

      {/* Product details */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-md font-semibold text-gray-800 line-clamp-2" title={product.name}>
            {product.name}
          </h3>
          <button className="text-gray-400 hover:text-red-500">
            <FiHeart />
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                fill={i < Math.floor(product.overallRating) ? 'currentColor' : 'none'} 
                size={14}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount || 0})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#005399]">{priceDisplay}</span>
            {hasRange && (
              <span className="text-xs text-gray-500 ml-1">est.</span>
            )}
          </div>
          <button className="bg-[#005399] text-white p-2 rounded-full hover:bg-[#004080] transition">
            <FiShoppingCart size={16} />
          </button>
        </div>

        {/* Supplier info */}
        {product.supplier && (
          <div className="mt-2 flex items-center">
            <span className="text-xs text-gray-500">By </span>
            <span className="text-xs font-medium text-gray-700 ml-1 truncate">
              {product.supplier.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
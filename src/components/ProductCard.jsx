import React from 'react';

const ProductCard = ({ product }) => {
  const imageUrl = product?.images?.[0]?.url || '/placeholder.png';

  const priceDisplay = product.price?.priceType === 'NUMBER'
    ? `$${product.price.price}`
    : `$${product.price.lowPrice} - $${product.price.highPrice}`;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition p-4">
      <img
        src={imageUrl}
        alt={product.name}
        className="h-40 w-full object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold truncate">{product.name}</h3>
      <p className="text-sm text-gray-500 truncate">{product.description}</p>
      <div className="mt-2">
        <span className="text-indigo-600 font-bold">{priceDisplay}</span>
        <p className="text-xs text-yellow-500">{product.overallRating}★ ({product.reviewCount} reviews)</p>
      </div>
    </div>
  );
};

export default ProductCard;

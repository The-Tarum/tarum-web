import React from 'react';
import { FiStar, FiTruck, FiCheckCircle } from 'react-icons/fi';

const SupplierCard = ({ supplier }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100">
      {/* Supplier header */}
      <div className="bg-[#005399] p-4 text-white">
        <div className="flex items-center">
          <div className="bg-white rounded-full p-1 mr-3">
            <img 
              src={supplier.logo || '/supplier-placeholder.png'} 
              alt={supplier.name}
              className="w-10 h-10 object-contain rounded-full"
            />
          </div>
          <div>
            <h3 className="font-bold truncate">{supplier.name}</h3>
            <p className="text-xs opacity-80 truncate">{supplier.location}</p>
          </div>
        </div>
      </div>

      {/* Supplier details */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                fill={i < Math.floor(supplier.rating) ? 'currentColor' : 'none'} 
                size={14}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">
            {supplier.rating?.toFixed(1) || '0.0'} ({supplier.reviewCount || 0} reviews)
          </span>
        </div>

        {/* Verification */}
        {supplier.isVerified && (
          <div className="flex items-center text-green-600 text-sm mb-2">
            <FiCheckCircle className="mr-1" />
            <span>Verified Supplier</span>
          </div>
        )}

        {/* Categories */}
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">Categories:</h4>
          <div className="flex flex-wrap gap-1">
            {supplier.categories?.slice(0, 3).map((cat, i) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {cat}
              </span>
            ))}
            {supplier.categories?.length > 3 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                +{supplier.categories.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Delivery info */}
        <div className="flex items-center text-sm text-gray-600">
          <FiTruck className="mr-2 text-[#005399]" />
          <span>
            {supplier.deliveryTime || 'Standard'} delivery • 
            {supplier.minOrder ? ` Min order $${supplier.minOrder}` : ' No min order'}
          </span>
        </div>

        {/* View button */}
        <button className="mt-4 w-full py-2 bg-white border border-[#005399] text-[#005399] rounded-md hover:bg-[#005399] hover:text-white transition">
          View Products
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;
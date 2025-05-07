
import React, { useState } from 'react';
import { FiStar, FiSearch, FiFilter } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import ActionBar from '../../components/ActionBar';

const SupplierPage = () => {
  const { isMobileApp } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data
  const suppliers = [
    {
      id: 1,
      name: 'Tech Solutions Inc',
      rating: 4.8,
      products: 156,
      verified: true,
      image: 'https://via.placeholder.com/150',
      categories: ['Electronics', 'Gadgets']
    },
    // Add more dummy suppliers...
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ActionBar name="Suppliers" />
      
      <div className="p-4">
       
        {/* Suppliers Grid */}
        <div className={`grid ${isMobileApp ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={supplier.image}
                  alt={supplier.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{supplier.name}</h3>
                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-400" />
                    <span className="text-sm">{supplier.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {supplier.categories.map((category) => (
                  <span key={category} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {category}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{supplier.products} products</span>
                <button className="bg-primary-light text-white px-4 py-2 rounded-lg text-sm">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierPage;

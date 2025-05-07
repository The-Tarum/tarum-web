
import React, { useState } from 'react';
import { FiSearch, FiStar, FiCheck } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';
import { useAppContext } from '../../context/AppContext';
import { useParams, useNavigate } from "react-router-dom";
import CategoryTabView from "../../components/CategoryTabView";

const SupplierPage = () => {
   const { categoryId: routeCategoryId, subCategoryId: routeSubCategoryId } =
      useParams();
  const { isMobileApp } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(routeCategoryId || "");

  // Dummy data for suppliers and their products
  const suppliers = [
    {
      id: 1,
      name: 'Astro hyper',
      logo: 'https://via.placeholder.com/50',
      rating: 4.8,
      reviews: '(84K)',
      verified: true,
      products: [
        {
          id: 1,
          name: 'Titanium Dioxide',
          price: 8.40,
          image: 'https://via.placeholder.com/150',
          stock: true
        },
        {
          id: 2,
          name: 'Rutase Grade',
          price: 4.60,
          image: 'https://via.placeholder.com/150',
          stock: true
        },
        {
          id: 3,
          name: 'Titanium Dioxide',
          price: 3.99,
          image: 'https://via.placeholder.com/150',
          stock: false
        }
      ]
    },
    {
      id: 2,
      name: 'Nonshape',
      logo: 'https://via.placeholder.com/50',
      rating: 4.7,
      reviews: '(100K)',
      verified: true,
      products: [
        {
          id: 1,
          name: 'Titanium Dioxide',
          price: 5.40,
          image: 'https://via.placeholder.com/150',
          stock: true
        },
        {
          id: 2,
          name: 'Anatase Grade',
          price: 6.60,
          image: 'https://via.placeholder.com/150',
          stock: true
        },
        {
          id: 3,
          name: 'Anatase Titanium',
          price: 5.99,
          image: 'https://via.placeholder.com/150',
          stock: false
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <CategoryTabView onCategorySelected={(id) => setCategoryFilter(id)} />
      {/* Suppliers List */}
      <div className="flex-1 p-4">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={supplier.logo} alt={supplier.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{supplier.name}</h3>
                    {supplier.verified && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FiCheck size={12} />
                        Verified manufacturer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <FiStar className="text-yellow-400" />
                    <span>{supplier.rating}</span>
                    <span className="text-gray-500">{supplier.reviews}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {supplier.products.map((product) => (
                <ProductCard key={product.id} product={product} variant="simple" />
              ))}
            </div>

            <button className="w-full py-2 text-center text-blue-600 bg-white border border-blue-600 rounded-lg">
              View all 20+ items
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../services/productService';
import { fetchCategories, fetchSubcategories } from '../../api/categoryApi';
import ProductCard from '../../components/ProductCard';
import SupplierCard from '../../components/SupplierCard';
import { FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const MarketplacePage = () => {
  const { categoryId: routeCategoryId, subCategoryId: routeSubCategoryId } = useParams();
  const navigate = useNavigate();

  // State management
  const [categoryFilter, setCategoryFilter] = useState(routeCategoryId || '');
  const [subcategoryFilter, setSubcategoryFilter] = useState(routeSubCategoryId || '');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'suppliers'
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      // Load categories
      const cats = await fetchCategories();
      if (cats.success) setCategories(cats.data || []);
      
      // Load initial products and suppliers
      const filters = {
        categoryId: categoryFilter,
        subCategoryId: subcategoryFilter,
        price: priceRange[1],
        rating: minRating,
        search: searchQuery
      };
      
      const [prods, supps] = await Promise.all([
        fetchProducts(filters),
        []
      ]);
      
      setProducts(prods);
      setSuppliers(supps);
    };
    
    loadData();
  }, [categoryFilter, subcategoryFilter, priceRange, minRating, searchQuery]);

  useEffect(() => {
    if (categoryFilter) {
      const loadSubcategories = async () => {
        const data = await fetchSubcategories(categoryFilter);
        if (data.success) setAvailableSubcategories(data.data || []);
      };
      loadSubcategories();
    } else {
      setAvailableSubcategories([]);
      setSubcategoryFilter('');
    }
  }, [categoryFilter]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
  

      {/* Main content */}
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <div className={`lg:w-64 bg-white rounded-lg shadow-sm p-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <button 
              onClick={() => setShowFilters(false)} 
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Category accordion */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <div key={cat.id} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex justify-between items-center py-2 text-gray-800 hover:text-blue-600"
                  >
                    <span>{cat.name}</span>
                    {expandedCategories.includes(cat.id) ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  
                  {expandedCategories.includes(cat.id) && (
                    <div className="ml-4 py-2 space-y-1">
                      {availableSubcategories
                        .filter(sub => sub.categoryId === cat.id)
                        .map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => setSubcategoryFilter(sub.id)}
                            className={`block w-full text-left px-2 py-1 text-sm rounded ${sub.id === subcategoryFilter ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                          >
                            {sub.name}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, +e.target.value])}
              className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Rating filter */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1, 0].map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex items-center w-full px-3 py-1.5 rounded-lg ${minRating === rating ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {rating > 0 ? (
                    <>
                      {Array(rating).fill().map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      <span className="ml-1">& up</span>
                    </>
                  ) : (
                    <span>All Ratings</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
            >
              <FiFilter />
        
            </button>
          </div>



          {/* Results */}
          {activeTab === 'products' ? (
            <div>
             
              {products.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500">No products found matching your filters.</p>
                  <button 
                    onClick={() => {
                      setCategoryFilter('');
                      setSubcategoryFilter('');
                      setPriceRange([0, 10000]);
                      setMinRating(0);
                    }}
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Suppliers</h2>
              {suppliers.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p className="text-gray-500">No suppliers found matching your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suppliers.map(supplier => (
                    <SupplierCard key={supplier.id} supplier={supplier} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;


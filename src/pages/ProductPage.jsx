import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/productService';
import { fetchCategories, fetchSubcategories } from '../api/categoryApi';
import ProductCard from '../components/ProductCard';
import { FaFilter } from 'react-icons/fa'; // Importing a filter icon

const ProductPage = () => {
  const { categoryId: routeCategoryId, subCategoryId: routeSubCategoryId } = useParams();
  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState(routeCategoryId || '');
  const [subcategoryFilter, setSubcategoryFilter] = useState(routeSubCategoryId || '');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  const [showFilters, setShowFilters] = useState(false); // for mobile toggle

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      if (data.success) setCategories(data.data || []);
    };
    loadCategories();
  }, []);

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

  useEffect(() => {
    const loadProducts = async () => {
      const filters = {
        categoryId: categoryFilter,
        subCategoryId: subcategoryFilter,
        price: priceRange[1],
        rating: minRating,
      };
      const data = await fetchProducts(filters);
      if (data.success) setProducts(data.data || []);
    };
    loadProducts();
  }, [categoryFilter, subcategoryFilter, priceRange, minRating]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden p-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm">
        {/* Hide the Explore Products heading for mobile */}
        <button
          className="text-indigo-600 font-medium border border-indigo-600 px-3 py-1 rounded-lg shadow-sm transition-all hover:bg-indigo-100"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter size={20} />
        </button>
      </div>

      {/* Sidebar Filters */}
      <div
        className={`w-full lg:w-64 p-6 bg-white shadow-sm rounded-lg z-10 transition-all ${
          showFilters ? 'block' : 'hidden'
        } lg:block`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Filters</h2>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={!availableSubcategories.length}
          >
            <option value="">{availableSubcategories.length ? 'All Subcategories' : 'Select a Category first'}</option>
            {availableSubcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, +e.target.value])}
            className="w-full p-2 bg-indigo-50 rounded-lg cursor-pointer"
          />
          <p className="text-xs text-gray-600 mt-2">Up to ${priceRange[1]}</p>
        </div>

        {/* Minimum Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(+e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="0">All Ratings</option>
            <option value="1">1★ & above</option>
            <option value="2">2★ & above</option>
            <option value="3">3★ & above</option>
            <option value="4">4★ & above</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Only display heading for desktop */}
        <h1 className="hidden lg:block text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">Explore Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found matching your filters.</p>
          ) : (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/productService';
import { fetchCategories, fetchSubcategories } from '../api/categoryApi';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
  // Get route params (if any) as initial values
  const { categoryId: routeCategoryId, subCategoryId: routeSubCategoryId } = useParams();
  const navigate = useNavigate();

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState(routeCategoryId || '');
  const [subcategoryFilter, setSubcategoryFilter] = useState(routeSubCategoryId || '');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);

  // Data states for products & filters
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  // Fetch all categories for the dropdown list
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      if (data.success) {
        setCategories(data.data || []);
      }
    };
    loadCategories();
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (categoryFilter) {
      const loadSubcategories = async () => {
        const data = await fetchSubcategories(categoryFilter);
        if (data.success) {
          setAvailableSubcategories(data.data || []);
        }
      };
      loadSubcategories();
    } else {
      // Clear subcategories if no category is selected
      setAvailableSubcategories([]);
      setSubcategoryFilter('');
    }
  }, [categoryFilter]);

  // Fetch products based on filter criteria
  useEffect(() => {
    const loadProducts = async () => {
      const filters = {
        categoryId: categoryFilter,
        subCategoryId: subcategoryFilter,
        price: priceRange[1],
        rating: minRating,
      };
      const data = await fetchProducts(filters);
      if (data.success) {
        setProducts(data.data || []);
      }
    };
    loadProducts();
  }, [categoryFilter, subcategoryFilter, priceRange, minRating]);

  // When a filter changes, also optionally update the route (so it can be bookmarkable)
  useEffect(() => {
    // You can update the URL query parameters if desired.
    // For example:
    // navigate(`/products/${categoryFilter}/${subcategoryFilter}`);
  }, [categoryFilter, subcategoryFilter, navigate]);

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <div className="w-64 p-6 border-r bg-white">
        <h2 className="text-xl font-bold mb-6">Filters</h2>

        {/* Category Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Subcategory</label>
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            className="w-full border rounded px-2 py-1"
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

        {/* Price Range Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, +e.target.value])}
            className="w-full"
          />
          <p className="text-xs text-gray-600">Up to ${priceRange[1]}</p>
        </div>

        {/* Minimum Rating Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Minimum Rating</label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(+e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="0">All Ratings</option>
            <option value="1">1★ & above</option>
            <option value="2">2★ & above</option>
            <option value="3">3★ & above</option>
            <option value="4">4★ & above</option>
          </select>
        </div>

        {/* You can add more filters (e.g., Delivery Type, Payment Options) here */}
      </div>

      {/* Product Grid */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Explore Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found matching your filters.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

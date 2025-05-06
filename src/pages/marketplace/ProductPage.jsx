import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaSearch, FaClock } from 'react-icons/fa';
import { fetchProducts } from '../../services/ProductService';
import { fetchCategories, fetchSubcategories } from '../../services/CategoryService';
import ProductCard from '../../components/ProductCard';
import SupplierCard from '../../components/SupplierCard';
import AutoScrollBanner from '../../components/AutoScrollBanner';
import CategoryTabView from '../../components/CategoryTabView';
import Section from '../../components/Section';
import ProductList from '../../components/ProductList'

const CategoryCard = ({ name, image }) => (
  <div className="flex flex-col items-center gap-2 w-24 flex-shrink-0">
    <img
      src={image}
      alt={name}
      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 p-1"
    />
    <label className="text-xs font-medium text-center leading-tight">{name}</label>
  </div>
);

const PopularCategories = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <Section 
      name="Popular Categories"
      onHeaderClick={() => navigate('/marketplace/categories')}
    >
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 px-2">
        {categories.map((category) => (
          <CategoryCard
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </Section>
  );
};

const sampleProducts = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 120,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 150,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 100,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Reebok Classic",
    price: 80,
    image: "https://via.placeholder.com/150"
  },
];

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
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Data fetching
  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts({
            categoryId: categoryFilter,
            subCategoryId: subcategoryFilter,
            price: priceRange[1],
            rating: minRating,
            search: searchQuery
          })
        ]);

        if (cats.success) setCategories(cats.data);
        setProducts(prods);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [categoryFilter, subcategoryFilter, priceRange, minRating, searchQuery]);

  // Subcategory handling
  useEffect(() => {
    const loadSubcategories = async () => {
      if (!categoryFilter) {
        setAvailableSubcategories([]);
        return;
      }

      try {
        const data = await fetchSubcategories(categoryFilter);
        if (data.success) setAvailableSubcategories(data.data);
      } catch (error) {
        console.error('Error loading subcategories:', error);
      }
    };

    loadSubcategories();
  }, [categoryFilter]);

  // Category accordion
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="p-4">
        <h2 className="font-bold mb-6">Business Tools</h2>
        <div className="flex gap-4 flex-row md:flex-row">
          <button
            className="flex items-center justify-between bg-secondary text-white px-6 py-4 rounded-2xl shadow-md hover:bg-secondary transition"
            onClick={() => navigate('/marketplace/categories')}
          >
            <span className="text-xs font-semibold text-left">All Categories</span>
            <div className="bg-green-600 p-3 rounded-full">
              <FaSearch />
            </div>
          </button>

          <button className="flex items-center justify-between bg-primary-light text-white px-6 py-4 rounded-2xl shadow-md hover:bg-primary-light transition">
            <span className="text-xs font-semibold text-left">Request for Quotation</span>
            <div className="bg-primary-light p-3 rounded-full">
              <FaClock />
            </div>
          </button>
        </div>
      </div>

      <PopularCategories categories={categories} />
      <AutoScrollBanner />
      
      <Section name="You Might Need">
        <CategoryTabView onCategorySelected={(id) => setCategoryFilter(id)} />
      </Section>
      <ProductList title="Trending Shoes" products={sampleProducts} />

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default MarketplacePage
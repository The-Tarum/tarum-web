import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/CategoryService';

const CategoryTab = ({ categories, selectedCategoryId, onCategoryTab }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <ul className="flex overflow-x-auto scrollbar-hide px-4">
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => onCategoryTab(cat.id)}
            className={`px-4 py-3 cursor-pointer transition-colors ${
              cat.id === selectedCategoryId // Changed to _id
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="text-sm whitespace-nowrap">
              {cat.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Shimmer = () => (
  <div className="w-full bg-white border-b border-gray-200 animate-pulse">
    <ul className="flex overflow-x-auto scrollbar-hide px-4">
      {[...Array(5)].map((_, i) => (
        <li key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </li>
      ))}
    </ul>
  </div>
);

const CategoryTabView = ({ onCategorySelected }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);


  // In CategoryTabView component
useEffect(() => {
  const fetchData = async () => {
    try {
      const cats = await fetchCategories();
      setCategories(cats);
      
      // Auto-select first category after load
      if (cats.length > 0) {
        const firstCategoryId = cats[0].id; // Make sure this matches your ID property name
        setSelectedCategoryId(firstCategoryId);
        onCategorySelected(firstCategoryId);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);



  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    onCategorySelected(categoryId);
  };

  return (
    <>
      {loading ? (
        <Shimmer />
      ) : (
        <CategoryTab 
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onCategoryTab={handleCategorySelect}
        />
      )}
    </>
  );
};

export default CategoryTabView;
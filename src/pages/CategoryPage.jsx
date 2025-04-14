import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchSubcategories } from '../api/categoryApi';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    fetchSubcategories(categoryId).then(setSubcategories);
  };

  const handleSubcategoryClick = (subCategoryId) => {
    navigate(`/products/${selectedCategoryId}/${subCategoryId}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-12 sm:p-16 rounded-lg shadow-lg mb-10 sm:mb-12 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 sm:mb-4">Explore Our Categories</h1>
        <p className="text-md sm:text-xl">Find what you're looking for from a variety of categories and subcategories</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-lg bg-white p-4 sm:p-6 text-center border border-gray-300 hover:border-indigo-500"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-28 w-28 sm:h-36 sm:w-36 mx-auto object-cover rounded-lg mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110"
            />
            <p className="text-md sm:text-lg font-semibold text-gray-800">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Subcategories */}
      {selectedCategoryId && (
        <>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-5 sm:mb-6 text-gray-800 text-center sm:text-left">
            Subcategories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {subcategories.map((sub) => (
              <div
                key={sub.id}
                onClick={() => handleSubcategoryClick(sub.id)}
                className="cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-lg bg-white p-4 sm:p-6 text-center border border-gray-200 hover:border-indigo-500"
              >
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="h-24 w-24 sm:h-32 sm:w-32 mx-auto object-cover rounded-lg mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110"
                />
                <p className="text-md sm:text-lg font-medium text-gray-700">{sub.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;

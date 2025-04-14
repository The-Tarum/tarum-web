import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchSubcategories } from '../api/categoryApi';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
      if (cats.length > 0) {
        setSelectedCategoryId(cats[0]._id);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Selected category ID changed:', selectedCategoryId);
    if (selectedCategoryId) {
      const fetchSubs = async () => {
        console.log('Calling fetchSubcategories with:', selectedCategoryId);
        const subs = await fetchSubcategories(selectedCategoryId);
        console.log('Subcategories fetched:', subs);
        setSubcategories(subs);
      };
      fetchSubs();
    }
  }, [selectedCategoryId]);

  // 👇 Fix to force trigger fetch even on same ID click
  const handleCategoryClick = (id) => {
    if (id === selectedCategoryId) {
      setSelectedCategoryId(null);
      setTimeout(() => setSelectedCategoryId(id), 0);
    } else {
      setSelectedCategoryId(id);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-28 bg-white shadow-md overflow-y-auto border-r border-gray-200">
        <ul className="flex flex-col items-center space-y-4 py-6">
          {categories.map((cat) => (
            <li
              key={cat._id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex flex-col items-center justify-center cursor-pointer px-3 py-2 rounded-xl transition-all duration-200 ${
                cat._id === selectedCategoryId
                  ? 'bg-blue-100 text-blue-700 font-semibold shadow'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <img
                src={cat.image || 'https://via.placeholder.com/40'}
                alt={cat.name}
                className="w-8 h-8 object-contain mb-1"
              />
              <div className="text-[10px] text-center truncate">{cat.name}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Subcategories */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-5 border-b pb-2">
          {categories.find((c) => c.id === selectedCategoryId)?.name || 'Subcategories'}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border hover:shadow-md cursor-pointer transition-all"
              onClick={() => navigate(`/products?subCategoryId=${sub.id}`)}
            >
              <img
                src={sub.image || 'https://via.placeholder.com/64'}
                alt={sub.name}
                className="w-16 h-16 object-contain mb-2"
              />
              <span className="text-[10px] text-center text-gray-700 font-medium truncate">
                {sub.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
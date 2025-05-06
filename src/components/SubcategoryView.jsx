import React, { useState, useEffect } from 'react';
import { fetchSubcategories } from '../services/CategoryService';



const SubcategoryCard = ({ subcategory }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-24 flex-shrink-0">
      <img
        src={subcategory.image }
        alt={subcategory.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 p-1"
      />
      <label className="text-xs font-medium text-center leading-tight">{    subcategory.name}</label>
    </div>
  );
};

const SubcategoryShimmer = () => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-16 w-16 bg-gray-200 rounded-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
      ))}
    </div>
  );
};

const SubcategoryView = ({ categoryId }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubcategories = async () => {
      if (!categoryId) {
        setSubcategories([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchSubcategories(categoryId);
        setSubcategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubcategories();
  }, [categoryId]);

  if (!categoryId) {
    return (
      <SubcategoryShimmer />
    );
  }

  return (
    <div className="p-4">
      {loading ? (
        <SubcategoryShimmer />
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {subcategories.map((sub) => (
            <SubcategoryCard key={sub._id} subcategory={sub} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubcategoryView;
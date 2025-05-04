import CategoryTabView from '../components/CategoryTabView';
import SubcategoryView from '../components/SubcategoryView';
import ActionBar from '../components/ActionBar';
import React, { useState } from 'react';

const CategoryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);


  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ActionBar
        name = "Explore All Categories"
      />
  
      <CategoryTabView onCategorySelected={handleCategorySelect} />
            
            {/* Subcategories Grid */}
            <SubcategoryView 
              categoryId={selectedCategoryId}
              subcategories={subcategories}
              setSubcategories={setSubcategories}
            />
     
    </div>
  );
};

export default CategoryPage;
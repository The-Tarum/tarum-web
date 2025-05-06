import React, { useState } from 'react';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import FilterDrawer from './FilterDrawer';

const ProductCard = ({ product }) => (
  <div className="border rounded-2xl shadow-sm p-4">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl mb-2" />
    <h3 className="text-lg font-semibold">{product.name}</h3>
    <p className="text-sm text-gray-600">${product.price}</p>
  </div>
);



const SelectedFilters = ({ selectedFilters, onRemove }) => (
  <div className="flex flex-wrap gap-2 p-2">
    {selectedFilters.map((filter, idx) => (
      <div key={idx} className="bg-gray-100 text-sm px-3 py-1 rounded-full flex items-center gap-1">
        {filter.label} <button onClick={() => onRemove(filter)}><X size={14} /></button>
      </div>
    ))}
  </div>
);

const ProductList = ({ title, products }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleApplyFilters = () => {
    // Apply filter logic here
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setSelectedFilters([]);
  };

  const handleRemoveFilter = (filterToRemove) => {
    setSelectedFilters((prev) => prev.filter(f => f.label !== filterToRemove.label));
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold flex items-center gap-1">{title} <ChevronRight size={18} /></h1>
        <button onClick={() => setShowFilters(true)} className="flex items-center gap-1 text-sm text-gray-600">
          <SlidersHorizontal size={16} /> Filter
        </button>
      </div>

      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <SelectedFilters selectedFilters={selectedFilters} onRemove={handleRemoveFilter} />
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Filter Drawer */}
      {showFilters && (
        <FilterDrawer 
          filters={{}} 
          onApply={handleApplyFilters} 
          onReset={handleResetFilters} 
          onClose={() => setShowFilters(false)} 
        />
      )}
    </div>
  );
};

export default ProductList;

import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiStar, FiShoppingCart } from 'react-icons/fi';

const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState('Product');
  const [searchFilters, setSearchFilters] = useState({
    mainSearch: '',
    supplierSearch: '',
    productSearch: '',
    quotationSearch: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Mock data
  const tabs = ['Product', 'Suppliers', 'Quotation', 'Request'];
  const categories = ['Electronics', 'Furniture', 'Clothing', 'Industrial', 'Food'];
  
  const mockProducts = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 199.99, rating: 4.5 },
    { id: 2, name: 'Office Chair', category: 'Furniture', price: 299.99, rating: 4.2 },
    { id: 3, name: 'Smart Watch', category: 'Electronics', price: 159.99, rating: 4.7 },
    { id: 4, name: 'Industrial Drill', category: 'Industrial', price: 499.99, rating: 4.8 },
  ];

  const mockSuppliers = [
    { id: 1, name: 'Tech Corp Ltd.', rating: 4.5, products: 42 },
    { id: 2, name: 'Furniture World', rating: 4.2, products: 28 },
    { id: 3, name: 'Industrial Tools Co.', rating: 4.8, products: 56 },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchFilters.mainSearch.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const filteredSuppliers = mockSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchFilters.supplierSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Tabs */}
            <div className="flex space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-[#005399] text-[#005399]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {/* Main Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-48 px-3 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#005399]"
                    value={searchFilters.mainSearch}
                    onChange={(e) => setSearchFilters({...searchFilters, mainSearch: e.target.value})}
                  />
                  <FiSearch className="absolute right-3 top-2.5 text-gray-400" size={16} />
                </div>

                {/* Category Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center justify-between w-32 px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-500"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  >
                    <span>{selectedCategory || 'Category'}</span>
                    <FiChevronDown className="ml-1" />
                  </button>
                  {showCategoryDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setSelectedCategory('')}
                      >
                        All Categories
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryDropdown(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Additional Filters */}
                <input
                  type="text"
                  placeholder="Product..."
                  className="w-32 px-3 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#005399]"
                  value={searchFilters.productSearch}
                  onChange={(e) => setSearchFilters({...searchFilters, productSearch: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Quotatl..."
                  className="w-32 px-3 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#005399]"
                  value={searchFilters.quotationSearch}
                  onChange={(e) => setSearchFilters({...searchFilters, quotationSearch: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === 'Product' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all">
                  <div className="h-40 bg-gray-100 rounded-lg mb-2"></div>
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#005399] font-bold">${product.price}</span>
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400" />
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <button className="w-full mt-2 bg-[#005399] text-white py-2 rounded-md hover:bg-[#004080] transition flex items-center justify-center">
                    <FiShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Suppliers' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSuppliers.map((supplier) => (
                <div key={supplier.id} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{supplier.name}</h3>
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400" />
                      <span className="text-sm ml-1">{supplier.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{supplier.products} products available</p>
                  <button className="w-full mt-4 border border-[#005399] text-[#005399] py-2 rounded-md hover:bg-[#005399] hover:text-white transition">
                    View Products
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add similar sections for Quotation and Request tabs */}
      </div>
    </div>
  );
};

export default MarketplacePage;



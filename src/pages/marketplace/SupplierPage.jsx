import React, { useState, useEffect } from 'react';
import { FiSearch, FiStar, FiCheck } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';
import { useAppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import CategoryTabView from '../../components/CategoryTabView';
import { fetchSuppliers } from '../../services/SupplierService';

const SupplierPage = () => {
  const { categoryId: routeCategoryId, subCategoryId: routeSubCategoryId } = useParams();
  const { isMobileApp } = useAppContext();

  const [categoryFilter, setCategoryFilter] = useState(routeCategoryId || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          categoryId: categoryFilter,
          subCategoryId: routeSubCategoryId,
          search: searchQuery,
          page,
          pageSize: 10,
        };
        const { success, data, totalPages: tp, error: err } = await fetchSuppliers(params);
        if (success) {
          setSuppliers(data);
          setTotalPages(tp);
        } else {
          setError(err);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    if (categoryFilter) load();
  }, [categoryFilter, routeSubCategoryId, searchQuery, page]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CategoryTabView onCategorySelected={(id) => { setCategoryFilter(id); setPage(1); }} />

      {/* Search bar */}
      <div className="p-4">
        <div className="relative">
          <FiSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="flex-1 p-4">
        {loading && <p>Loading suppliers...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {suppliers.map(({ supplier, products }) => (
          <div key={supplier.id} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={supplier.logo} alt={supplier.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{supplier.name}</h3>
                    {supplier.verified && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FiCheck size={12} /> Verified manufacturer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <FiStar /> <span>{supplier.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} variant="chemical" />
              ))}
            </div>

            <button className="w-full py-2 text-center text-blue-600 bg-white border border-blue-600 rounded-lg">
              View all {products.length} items
            </button>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Next</button>
        </div>
      </div>
    </div>
  );
};

export default SupplierPage;

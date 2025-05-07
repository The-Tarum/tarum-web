
import React, { useState, useEffect } from 'react';
import { QuotationService } from '../../services/QuotationService';
import ActionBar  from '../../components/ActionBar';
import { FiPlus, FiX } from 'react-icons/fi';

const RequestQuotaPage = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [quotations, setQuotations] = useState([]);
  const [newQuotation, setNewQuotation] = useState({
    products: [{
      productName: '',
      quantity: '',
      unit: 'Kilogram',
      manufacturer: '',
      requirements: ''
    }],
    deliveryLocation: '',
    deliverySource: '',
    payment: 'CDC'
  });

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    const response = await QuotationService.getQuotations();
    setQuotations(response.data);
  };

  const addProduct = () => {
    setNewQuotation(prev => ({
      ...prev,
      products: [...prev.products, {
        productName: '',
        quantity: '',
        unit: 'Kilogram',
        manufacturer: '',
        requirements: ''
      }]
    }));
  };

  const removeProduct = (index) => {
    setNewQuotation(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      await QuotationService.submitQuotation(newQuotation);
      setActiveTab('list');
      loadQuotations();
    } catch (error) {
      console.error('Failed to submit quotation:', error);
    }
  };

  const handleProductChange = (index, field, value) => {
    setNewQuotation(prev => ({
      ...prev,
      products: prev.products.map((product, i) => 
        i === index ? { ...product, [field]: value } : product
      )
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ActionBar name="Request Quotation" />
      
      <div className="flex space-x-4 p-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('list')}
        >
          Quotations
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'new' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('new')}
        >
          New Request
        </button>
      </div>

      {activeTab === 'list' ? (
        <div className="p-4">
          <div className="grid gap-4">
            {quotations.map((quotation) => (
              <div key={quotation.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <img src={quotation.image} alt="" className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{quotation.productName}</h3>
                    <p className="text-sm text-gray-600">{quotation.quotesReceived} quotes received</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <form className="space-y-6">
            {newQuotation.products.map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Product {index + 1}</h3>
                  {index > 0 && (
                    <button type="button" onClick={() => removeProduct(index)}>
                      <FiX className="text-red-500" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product name"
                    className="w-full p-2 border rounded"
                    value={product.productName}
                    onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                  />
                  
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="w-1/2 p-2 border rounded"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                    />
                    <select
                      className="w-1/2 p-2 border rounded"
                      value={product.unit}
                      onChange={(e) => handleProductChange(index, 'unit', e.target.value)}
                    >
                      <option value="Kilogram">Kilogram</option>
                      <option value="Liter">Liter</option>
                      <option value="Piece">Piece</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addProduct}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500"
            >
              <FiPlus className="mx-auto" />
              Add More
            </button>

            <div className="bg-white p-4 rounded-lg shadow space-y-4">
              <input
                type="text"
                placeholder="Delivery location"
                className="w-full p-2 border rounded"
                value={newQuotation.deliveryLocation}
                onChange={(e) => setNewQuotation(prev => ({ ...prev, deliveryLocation: e.target.value }))}
              />
              
              <input
                type="text"
                placeholder="Delivery source"
                className="w-full p-2 border rounded"
                value={newQuotation.deliverySource}
                onChange={(e) => setNewQuotation(prev => ({ ...prev, deliverySource: e.target.value }))}
              />
              
              <select
                className="w-full p-2 border rounded"
                value={newQuotation.payment}
                onChange={(e) => setNewQuotation(prev => ({ ...prev, payment: e.target.value }))}
              >
                <option value="CDC">CDC</option>
                <option value="LC">LC</option>
                <option value="TT">TT</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-1/2 bg-blue-600 text-white py-2 rounded"
              >
                Submit to All
              </button>
              <button
                type="button"
                className="w-1/2 bg-green-600 text-white py-2 rounded"
              >
                Submit to Select
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestQuotaPage;

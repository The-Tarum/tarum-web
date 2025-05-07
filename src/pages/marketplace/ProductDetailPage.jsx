
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiHeart, FiShare2, FiShoppingCart } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import ActionBar from '../../components/ActionBar';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { isMobileApp } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  // Dummy product data
  const product = {
    id: productId,
    name: 'Premium Product',
    description: 'High-quality product with excellent features',
    price: 299.99,
    stock: 150,
    rating: 4.8,
    reviews: 245,
    images: ['https://via.placeholder.com/600x400'],
    specifications: {
      brand: 'Premium Brand',
      model: '2024',
      material: 'Premium Grade'
    }
  };

  const handleRequestQuote = () => {
    // Implement quote request logic
    console.log('Requesting quote for quantity:', quantity);
  };

  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 ${isMobileApp ? '' : 'px-4 py-2'}`}>
      <ActionBar name="Product Details" />
      
      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Product Images */}
        <div className={`${isMobileApp ? 'w-full' : 'w-1/2'}`}>
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full rounded-xl object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className={`${isMobileApp ? 'w-full' : 'w-1/2'}`}>
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold">${product.price}</div>
            <div className="text-sm text-gray-500">Stock: {product.stock} units</div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center border rounded-lg w-32">
              <button
                className="px-3 py-2 text-gray-600"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center border-x"
              />
              <button
                className="px-3 py-2 text-gray-600"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={handleRequestQuote}
              className="flex-1 bg-primary-light text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <FiShoppingCart />
              Request Quote
            </button>
            <button className="p-3 border rounded-lg">
              <FiHeart className="text-gray-600" />
            </button>
            <button className="p-3 border rounded-lg">
              <FiShare2 className="text-gray-600" />
            </button>
          </div>

          {/* Specifications */}
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-3">Specifications</h2>
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

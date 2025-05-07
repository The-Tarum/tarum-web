import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiShare2, FiShoppingCart } from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";
import ActionBar from "../../components/ActionBar";
import { fetchProductDetails } from "../../services/ProductService";

// Dummy shimmer
const Shimmer = () => (
  <div className="animate-pulse p-4">
    <div className="h-48 bg-gray-300 rounded mb-4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
  </div>
);

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const { isMobileApp } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchProductDetails(productId);
        if (response.success) {
          setProduct(response.data);
        }
      } catch (err) {
        // fallback
        setProduct({
          name: "Citric Acid",
          ProductImages: [{ imageUrl: "https://via.placeholder.com/400", type: "image/jpeg" }],
          ProductPrice: { price: 0.95 },
          quantity: 3000,
          packaging: "25 kgs",
          storage: "EXW New Jersey",
          deliveryType: "Courier",
          expectedDeliveryDays: "Immediate",
          attributes: { grade: "Food Grade" },
          reviewCount: 117,
          overallRating: "4.3",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId]);

  const handleRequestQuote = () => {
    console.log("Requesting quote for quantity:", quantity);
  };

  if (loading) return <Shimmer />;

  const {
    name,
    ProductImages = [],
    ProductPrice = {},
    packaging,
    storage,
    deliveryType,
    expectedDeliveryDays,
    attributes = {},
    reviewCount,
    overallRating,
  } = product;

  const price = ProductPrice.price || 0.95;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ActionBar name="Product Details" />

      <div className="p-4">
        {/* Media Gallery */}
        <div className="flex gap-2 overflow-x-auto mb-4">
          {ProductImages.length > 0 ? (
            ProductImages.map((media, idx) => {
              const isVideo = media.type?.includes("video");
              return (
                <div key={idx} className="min-w-[300px] max-w-[300px] aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                  {isVideo ? (
                    <video
                      controls
                      className="w-full h-full object-contain"
                      src={media.imageUrl}
                    />
                  ) : (
                    <img
                      src={media.imageUrl}
                      alt={`Product media ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              );
            })
          ) : (
            <img
              src="https://via.placeholder.com/400"
              alt={name}
              className="w-full h-64 object-contain rounded-lg"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="mb-2">
          <h1 className="text-xl font-semibold">{name}</h1>
          <p className="text-sm text-gray-500">Busnik Specialities</p>
          <div className="flex items-center text-yellow-500 text-sm">
            ⭐ {overallRating || "4.2"} • {reviewCount || 100} reviews
          </div>
        </div>

        {/* Attributes */}
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p>Minimum order: {quantity || 3000} units</p>
          <p>Price: ${price}/{product.unit || "kg"}</p>
          <p>Packaging: {packaging}</p>
          <p>Storage: {storage}</p>
          <p>Delivery: {deliveryType}</p>
          <p>Lead time: {expectedDeliveryDays}</p>
          {Object.entries(attributes).map(([key, val]) => (
            <p key={key}>
              {key[0].toUpperCase() + key.slice(1)}: {val}
            </p>
          ))}
        </div>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <div className="flex items-center border rounded w-32">
            <button
              className="px-3 py-2 text-gray-600"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
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
            Sample Request
          </button>
          <button className="p-3 border rounded-lg">
            <FiHeart className="text-gray-600" />
          </button>
          <button className="p-3 border rounded-lg">
            <FiShare2 className="text-gray-600" />
          </button>
        </div>

        {/* Reviews */}
        <div className="border-t pt-4">
          <h2 className="text-md font-semibold mb-2">Review ({reviewCount || 117})</h2>
          <div className="bg-gray-100 rounded p-2 text-sm mb-2">
            "We brought this many times, best quality natural sweetener..."
            <div className="text-xs text-gray-500">January 06, 2024</div>
          </div>
          <button className="text-blue-500 text-sm">See All Reviews</button>
        </div>

        {/* Similar Products (Static) */}
        <div className="mt-6">
          <h2 className="text-md font-semibold mb-2">
            Similar products from supplier
          </h2>
          <div className="flex gap-4 overflow-x-auto">
            {["Ascorbic Acid", "Steel", "Titanium Dioxide"].map((item, idx) => (
              <div key={idx} className="min-w-[100px] text-sm">
                <img
                  src="https://via.placeholder.com/100"
                  className="rounded mb-1"
                />
                <div>{item}</div>
                <div className="text-xs text-gray-500">$3.50</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex gap-2 z-50">
        <button className="flex-1 border py-2 rounded">Chat</button>
        <button className="flex-1 border py-2 rounded">Send Inquiry</button>
        <button className="flex-1 bg-blue-600 text-white py-2 rounded">Buy</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

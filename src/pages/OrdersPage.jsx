import React, { useEffect, useState } from 'react';

const mockOrders = [
  {
    id: 'ORD-001',
    date: '2025-04-10',
    status: 'Delivered',
    total: 4500,
    items: 3,
  },
  {
    id: 'ORD-002',
    date: '2025-04-05',
    status: 'Shipped',
    total: 2800,
    items: 2,
  },
  {
    id: 'ORD-003',
    date: '2025-03-28',
    status: 'Processing',
    total: 1200,
    items: 1,
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // In real use, replace this with an API call
    setTimeout(() => {
      setOrders(mockOrders);
    }, 500); // Simulate API delay
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* Orders List */}
      <div className="flex-1 p-6 overflow-y-auto">
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">Loading orders...</div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">Order ID: {order.id}</h2>
                    <p className="text-xs text-gray-500">Date: {order.date}</p>
                  </div>
                  <div className="text-sm font-medium text-blue-600">{order.status}</div>
                </div>

                <div className="flex justify-between items-center mt-3 text-sm text-gray-700">
                  <span>{order.items} item(s)</span>
                  <span className="font-semibold">Rs. {order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

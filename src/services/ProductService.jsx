export const fetchProducts = async (filters = {}) => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams(filters).toString();
  
    const res = await fetch(
      `https://k6f31f066f.execute-api.us-east-2.amazonaws.com/services/products/api/products?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.json();
  };
  
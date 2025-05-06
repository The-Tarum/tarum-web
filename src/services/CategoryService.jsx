const BASE_URL = import.meta.env.VITE_CATEGORY_SERVICE;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return await res.json();
};

export const fetchSubcategories = async (categoryId) => {
  const res = await fetch(`${BASE_URL}/subcategories?categoryId=${categoryId}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch subcategories');
  return await res.json();
};

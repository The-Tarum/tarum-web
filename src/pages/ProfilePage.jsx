import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens, user data, etc.
    localStorage.clear(); // or remove specific items
    navigate('/'); // Redirect to login
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
 
      {/* Profile Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border max-w-md mx-auto space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/64"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Wajahat Iqbal</h2>
              <p className="text-sm text-gray-500">Senior Software Engineer</p>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <div>
              <label className="text-xs text-gray-500">Email</label>
              <p className="text-sm font-medium text-gray-700">wajahat@example.com</p>
            </div>

            <div>
              <label className="text-xs text-gray-500">Location</label>
              <p className="text-sm font-medium text-gray-700">Pakistan</p>
            </div>

            <div>
              <label className="text-xs text-gray-500">Role</label>
              <p className="text-sm font-medium text-gray-700">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button Fixed at Bottom */}
      <div className="p-4 border-t bg-white shadow-inner">
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

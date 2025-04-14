import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginDto from '../dtos/auth.dto';
import { login } from '../api/authApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ React Router hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const loginDto = new LoginDto(email, password);

    try {
      const result = await login(loginDto);
      console.log('Login success:', result);

      // Save token to localStorage
      localStorage.setItem('token', result.idToken);

      // Redirect to Home page
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Login failed');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <form className="bg-white p-8 rounded-lg shadow-xl w-96 space-y-6" onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h2>
        <p className="text-center text-gray-600">Please log in to your account</p>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Log In
        </button>

        <div className="text-center">
  <p className="text-sm text-gray-600">
    Don't have an account? 
    <span
      className="text-blue-500 cursor-pointer ml-1"
      onClick={() => navigate('/signup')}
    >
      Sign Up
    </span>
  </p>
</div>
      </form>
    </div>
  );
};

export default LoginPage;

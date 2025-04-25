import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginDto from '../dtos/auth.dto';
import { login } from '../api/authApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const loginDto = new LoginDto(email, password);

    try {
      const result = await login(loginDto);
      localStorage.setItem('token', result.idToken);
      navigate('/marketplace/home');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">Sign in to Your Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Access your dashboard and start shopping</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:primary-light"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary-light text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>

          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <span
              className="text-primary-light hover:underline cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

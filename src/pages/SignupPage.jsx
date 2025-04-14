import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterDto from '../dtos/register.dto';
import { register } from '../api/authApi';

const SignupPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    const registerDto = new RegisterDto(form);

    try {
      const result = await register(registerDto);
      console.log('Signup success:', result);

      // Redirect to login
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Signup failed');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <form className="bg-white p-8 rounded-lg shadow-xl w-96 space-y-6" onSubmit={handleSignup}>
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="middleName"
          placeholder="Middle Name"
          value={form.middleName}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

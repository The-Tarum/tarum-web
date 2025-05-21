import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/UserService.jsx';

const SignupPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    profileImage: null,
    address: {},
    company: {},
    companyRole: ''
  });
  const [showAddress, setShowAddress] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field) => {
    if (field === 'address') setShowAddress(prev => !prev);
    if (field === 'company') setShowCompany(prev => !prev);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [name]: type === 'file' ? files : value
      }
    }));
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) setForm(prev => ({ ...prev, profileImage: file }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Build multipart FormData
    const formData = new FormData();
    formData.append('firstName', form.firstName);
    formData.append('middleName', form.middleName);
    formData.append('lastName', form.lastName);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('phoneNumber', form.phoneNumber);
    formData.append('firebaseProvider', 'email');

    if (form.profileImage) formData.append('profileImage', form.profileImage);

    if (showAddress) {
      Object.entries(form.address).forEach(([key, value]) => formData.append(`address.${key}`, value));
    } else {
      formData.append('address', '');
    }

    if (showCompany) {
      Object.entries(form.company).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach(file => formData.append(`company.${key}`, file));
        } else {
          formData.append(`company.${key}`, value);
        }
      });
    } else {
      formData.append('company', '');
    }

    formData.append('companyRole', form.companyRole);

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {loading && (
        <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">Create Your Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Join us and start exploring amazing deals</p>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={form.middleName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImage}
              ref={fileInputRef}
              className="w-full"
            />
          </div>


          {/* Optional Sections Toggles */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleToggle('address')}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              {showAddress ? 'Remove Address' : 'Add Address'}
            </button>
            <button
              type="button"
              onClick={() => handleToggle('company')}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              {showCompany ? 'Remove Company' : 'Add Company'}
            </button>
          </div>

          {/* Address Section */}
          {showAddress && (
            <div className="space-y-3 p-4 border border-gray-300 rounded-lg">
              <h3 className="text-sm font-medium text-gray-800">Address Details</h3>
              <input name="streetLine1" placeholder="Street Line 1" onChange={handleAddressChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              <input name="streetLine2" placeholder="Street Line 2" onChange={handleAddressChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input name="city" placeholder="City" onChange={handleAddressChange} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                <input name="state" placeholder="State" onChange={handleAddressChange} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input name="country" placeholder="Country" onChange={handleAddressChange} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                <input name="postalCode" placeholder="Postal Code" onChange={handleAddressChange} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
          )}

          {/* Company Section */}
          {showCompany && (
            <div className="space-y-3 p-4 border border-gray-300 rounded-lg">
              <h3 className="text-sm font-medium text-gray-800">Company Details</h3>
              <input name="name" placeholder="Company Name" onChange={handleCompanyChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input name="originCountry" placeholder="Origin Country" onChange={handleCompanyChange} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                <input name="companyRegistrationNumber" placeholder="Registration Number" onChange={handleCompanyChange} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input name="taxIdentificationNumber" placeholder="Tax ID Number" onChange={handleCompanyChange} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                <input name="verificationDate" type="date" placeholder="Verification Date" onChange={handleCompanyChange} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Upload Documents (optional)</label>
                <input name="documents" type="file" multiple onChange={handleCompanyChange} className="w-full" />
              </div>
              <input name="companyRole" placeholder="Role (e.g. Manager)" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          )}

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate('/')}
            >
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // New loading state
  const [error, setError] = useState(null); // New error state
  const { setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);  // Set loading state to true before API request
    setError(null);  // Reset any previous errors

    const userData = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/users/login`, userData);

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);  // Update the user context
        localStorage.setItem('token', data.token);  // Store the token in localStorage
        navigate('/home');  // Redirect to the home page
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');  // Handle login error
    } finally {
      setLoading(false);  // Set loading state to false after request is completed
    }

    setEmail('');  // Clear email field
    setPassword('');  // Clear password field
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-6">
      {/* Logo */}
      <img className="w-20 mb-8" src="/images/logo.png" alt="Uber Logo" />

      {/* Login Form */}
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h3>

        {/* Error Message */}
        {error && (
          <div className="bg-red-200 text-red-800 p-3 mb-4 rounded-lg text-center">
            {error}
          </div>
        )}

        <label className="block text-lg font-bold mb-2 text-gray-900">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-200 mb-4 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          placeholder="email@example.com"
        />

        <label className="block text-lg font-bold mb-2 text-gray-900">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-200 mb-6 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          placeholder="password"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300"
          disabled={loading}  // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}  {/* Show loading text */}
        </button>

        <p className="text-center mt-4 text-gray-700 font-medium">
          New here?{' '}
          <Link to="/signup" className="text-black font-semibold hover:underline">
            Create Account
          </Link>
        </p>
      </form>

      {/* Captain Login Button */}
      <Link
        to="/captain-login"
        className="bg-yellow-300 flex items-center justify-center text-black font-semibold rounded-xl px-6 py-3 mt-8 shadow-lg hover:bg-yellow-600 transition duration-300 w-full max-w-md"
      >
        Sign in as Captain
      </Link>
    </div>
  );
};

export default UserLogin;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/captains/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('captainToken', response.data.token);
        navigate('/captain-dashboard'); // Redirect on success
      }
    } catch (err) {
      setError('Invalid email or password.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6 py-6">
      {/* Logo */}
      <img className="w-24 mb-8" src="/images/logo.png" alt="Uber Logo" />

      {/* Login Form */}
      <form onSubmit={submitHandler} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Captain Login</h3>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <label className="block text-lg font-bold mb-2 text-gray-900">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-200 rounded-xl px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-6"
          placeholder="email@example.com"
        />

        <label className="block text-lg font-bold mb-2 text-gray-900">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-200 rounded-xl px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-8"
          placeholder="password"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-900 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-6 text-gray-700 text-lg">
          Join a fleet?{' '}
          <Link to="/captain-signup" className="text-black font-semibold hover:underline">
            Register as a Captain
          </Link>
        </p>
      </form>

      {/* Alternative Sign-In Option */}
      <Link
        to="/login"
        className="bg-yellow-300 flex items-center justify-center text-black font-semibold rounded-xl px-6 py-3 mt-8 shadow-lg hover:bg-yellow-600 transition duration-300 w-full max-w-md"
      >
        Sign in as User
      </Link>
    </div>
  );
};

export default CaptainLogin;

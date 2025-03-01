import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-12">
      {/* Logo */}
      <img className="w-20 mb-8" src="/images/logo.png" alt="Uber Logo" />

      {/* Login Form */}
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h3>
        
        <label className="block text-lg font-medium mb-2 text-gray-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-200 mb-4 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          placeholder="email@example.com"
        />
        
        <label className="block text-lg font-medium mb-2 text-gray-700">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-200 mb-6 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          placeholder="password"
        />
        
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
          Login
        </button>
        
        <p className="text-center mt-4 text-gray-600">
          New here? <Link to="/signup" className="text-indigo-600 font-medium hover:underline">Create Account</Link>
        </p>
      </form>

      {/* Captain Login Button */}
      <Link to="/captain-login"
        className="bg-green-500 text-white font-semibold rounded-lg px-6 py-3 mt-6 shadow-md hover:bg-green-600 transition duration-300">
        Sign in as Captain
      </Link>
    </div>
  );
};

export default UserLogin;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6 py-6">
      {/* Logo */}
      <img className="w-24 mb-8" src="/images/logo.png" alt="Uber Logo" />

      {/* Login Form */}
      <form onSubmit={submitHandler} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Captain Login</h3>

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

        <button className="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-900 transition duration-300">
          Login
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

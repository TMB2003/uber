import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullname: { firstname, lastname },
      email,
      password,
    });
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-12">
      {/* Logo */}
      <img className="w-20 mb-6" src="/images/logo.png" alt="Uber Logo" />

      {/* Signup Form */}
      <form onSubmit={submitHandler} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Captain Sign-Up</h3>

        <label className="block text-lg font-bold mb-2 text-gray-900">Captain's Name</label>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            required
            className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-1/2 text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            required
            className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-1/2 text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <label className="block text-lg font-bold mb-2 text-gray-900">Captain's Email</label>
        <input
          type="email"
          required
          className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-4"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-lg font-bold mb-2 text-gray-900">Password</label>
        <input
          type="password"
          required
          className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-6"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300">
          Sign-Up
        </button>

        <p className="text-center mt-4 text-gray-700 font-medium">
          Already have an account? <Link to="/captain-login" className="text-black font-semibold hover:underline">Login as Captain</Link>
        </p>
      </form>

      {/* Terms and Conditions */}
      <p className="text-xs text-gray-500 text-center mt-6 px-6 leading-tight">
        By proceeding, you agree to receive calls, WhatsApp messages, or SMS from Uber on your mobile number, which you can opt out of anytime. You also agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default CaptainSignup;

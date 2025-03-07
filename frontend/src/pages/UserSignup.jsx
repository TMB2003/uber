import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullname: { firstname, lastname },
        email,
        password,
      };
  
      console.log("Sending data:", newUser); // Debugging
  
      const response = await axios.post(`${import.meta.env.VITE_API}/users/register`, newUser);
  
      console.log("Response:", response.data); // Debugging
  
      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-6">
      {/* Logo */}
      <img className="w-20 mb-4" src="/images/logo.png" alt="Uber Logo" />

      {/* Signup Form */}
      <form onSubmit={submitHandler} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Sign-Up</h3>

        <label className="block text-lg font-bold mb-2 text-gray-900">What's your Name?</label>
        <div className="flex gap-4">
          <input
            type="text"
            required
            className="bg-gray-200 mb-4 rounded-lg px-4 py-3 border border-gray-300 w-1/2 text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            required
            className="bg-gray-200 mb-4 rounded-lg px-4 py-3 border border-gray-300 w-1/2 text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <label className="block text-lg font-bold mb-2 text-gray-900">What is your Email?</label>
        <input
          type="email"
          required
          className="bg-gray-200 mb-4 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-lg font-bold mb-2 text-gray-900">Password</label>
        <input
          type="password"
          required
          className="bg-gray-200 mb-6 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300">
          Create Account
        </button>

        <p className="text-center mt-4 text-gray-700 font-medium">
          Already have an account? <Link to="/login" className="text-black font-semibold hover:underline">Login here</Link>
        </p>
      </form>

      {/* Terms & Conditions */}
      <p className="text-xs text-gray-500 text-center leading-tight mt-6 max-w-md">
        By proceeding, you agree to receive calls, WhatsApp messages, or SMS from Uber on your mobile number, which you can opt out of anytime. You also agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default UserSignup;

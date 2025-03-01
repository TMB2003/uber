import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: "url('/images/home.jpg')" }}
    >
      {/* Logo */}
      <img className="w-20 absolute top-8 left-8 sm:w-24" src="/images/logo.png" alt="Uber Logo" />

      {/* White Card Positioned at Bottom */}
      <div className="bg-white bg-opacity-95 rounded-t-3xl shadow-2xl p-8 sm:p-12 md:p-16 w-full absolute bottom-0 left-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 text-center">
          Get Started with Uber
        </h2>
        <p className="text-gray-700 mb-6 text-lg text-center">
          Sign in to experience a seamless ride-sharing service.
        </p>
        <Link
          to="/login"
          className="block w-full bg-black text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-800 transition duration-300 text-center"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;

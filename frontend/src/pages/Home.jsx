import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="relative h-screen bg-cover bg-center flex flex-col justify-between" style={{ backgroundImage: "url('/images/home.jpeg')" }}>
      <img className="w-16 ml-8 mt-8" src="/images/logo.png" alt="Uber Logo" />
      <div className="bg-white bg-opacity-90 rounded-lg mx-8 p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Get Started with Uber</h2>
        <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded-md shadow hover:bg-gray-800 transition duration-300">Continue</Link>
      </div>
    </div>
  )
}

export default Home

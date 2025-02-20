import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    })
    setEmail('');
    setPassword('');
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-gray-100">
      <div>
        <img className="w-16 ml-8 mt-8" src="/images/logo.png" alt="Uber Logo" />
        <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-lg mt-8">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Login</h3>
          <label className="block text-xl font-semibold mb-2 text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 mb-4 rounded px-4 py-2 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder="email@example.com"
          />
          <label className="block text-xl font-semibold mb-2 text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 mb-4 rounded px-4 py-2 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder="password"
          />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
            Login
          </button>
          <p className="text-center mt-4 text-gray-600">
            New here? <Link to="/signup" className="text-indigo-600">Create Account</Link>
          </p>
        </form>
      </div>
      <div>
        <Link to="/captain-login"
          className="bg-green-500 flex items-center justify-center text-white font-semibold rounded px-4 py-2 mt-8 shadow-md hover:bg-green-600 transition duration-300">
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin

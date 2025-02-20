import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
    })
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-gray-100">
      <div>
        <img className="w-16 ml-8 mt-8" src="/images/logo.png" alt="Uber Logo" />
        <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-lg mt-8">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Sign-Up</h3>
          <label className="block text-xl font-semibold mb-2 text-gray-700">What's your Name?</label>
          <div className="flex gap-4">
            <input
              type="text"
              required
              className="bg-gray-200 mb-4 rounded px-4 py-2 border border-gray-300 w-1/2 text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              required
              className="bg-gray-200 mb-4 rounded px-4 py-2 border border-gray-300 w-1/2 text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <label className="block text-xl font-semibold mb-2 text-gray-700">What is your Email?</label>
          <input
            type="email"
            required
            className="bg-gray-200 mb-4 rounded px-4 py-2 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block text-xl font-semibold mb-2 text-gray-700">Password</label>
          <input
            type="password"
            required
            className="bg-gray-200 mb-4 rounded px-4 py-2 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
            Sign-Up
          </button>
          <p className="text-center mt-4 text-gray-600">
            Already have an account? <Link to="/login" className="text-indigo-600">Login here</Link>
          </p>
        </form>
      </div>
      <div>
        <p className='text-xs text-gray-500 leading-tight mt-4'>By proceeding, you agree to receive calls, WhatsApp messages, or SMS from Uber on your mobile number, which you can opt out of anytime. You also agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default UserSignup

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from axios;

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('Car'); // Default value is "Car"

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType,
      },
    };
    const response = await axios.post(`${import.meta.env.VITE_API}/captains/register`, captainData)
    if(response.status === 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    
    // Reset fields after submission
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('Car'); // Reset dropdown to default
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-12">
      {/* Logo */}
      <img className="w-20 mb-6" src="/images/logo.png" alt="Uber Logo" />

      {/* Signup Form */}
      <form onSubmit={submitHandler} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Captain Sign-Up</h3>

        {/* Captain Name */}
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

        {/* Captain Email */}
        <label className="block text-lg font-bold mb-2 text-gray-900">Captain's Email</label>
        <input
          type="email"
          required
          className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-4"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="block text-lg font-bold mb-2 text-gray-900">Password</label>
        <input
          type="password"
          required
          className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-6"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Vehicle Details */}
        <h4 className="text-xl font-bold mt-6 mb-4 text-gray-800">Vehicle Details</h4>

        {/* Vehicle Color */}
        <label className="block text-lg font-bold mb-2 text-gray-900">Vehicle Color</label>
        <input
          type="text"
          required
          className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-4"
          placeholder="e.g., Red, Black, White"
          value={vehicleColor}
          onChange={(e) => setVehicleColor(e.target.value)}
        />

        {/* Vehicle Plate Number */}
        <label className="block text-lg font-bold mb-2 text-gray-900">Vehicle Plate Number</label>
        <input
          type="text"
          required
          className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-4"
          placeholder="e.g., ABC-1234"
          value={vehiclePlate}
          onChange={(e) => setVehiclePlate(e.target.value)}
        />

        {/* Vehicle Capacity */}
        <label className="block text-lg font-bold mb-2 text-gray-900">Vehicle Capacity</label>
        <input
          type="number"
          required
          className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 mb-4"
          placeholder="e.g., 4"
          value={vehicleCapacity}
          onChange={(e) => setVehicleCapacity(e.target.value)}
        />

        {/* Vehicle Type (Dropdown) */}
        <label className="block text-lg font-bold mb-2 text-gray-900">Vehicle Type</label>
        <select
          required
          className="bg-gray-200 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg focus:outline-none focus:border-indigo-500 mb-6"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="Car">Car</option>
          <option value="Auto">Auto</option>
          <option value="Bike">Bike</option>
        </select>

        {/* Create Captain Account Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300">
          Create Captain Account
        </button>

        <p className="text-center mt-4 text-gray-700 font-medium">
          Already have an account?{' '}
          <Link to="/captain-login" className="text-black font-semibold hover:underline">
            Login as Captain
          </Link>
        </p>
      </form>

      {/* Terms and Conditions */}
      <p className="text-xs text-gray-500 text-center mt-6 px-6 leading-tight">
        By proceeding, you agree to receive calls, WhatsApp messages, or SMS from Uber on your mobile number, which you
        can opt out of anytime. You also agree to our <span className="underline">Terms of Service</span> and{' '}
        <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default CaptainSignup;

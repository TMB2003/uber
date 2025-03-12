import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinishRide = ({ ride, setFinishRidePanel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function endRide() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${import.meta.env.VITE_API}/rides/end-ride`, {
        rideId: ride._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        navigate('/captain-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to end ride. Please try again.');
      console.error('End ride error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col bg-gray-100 p-6 min-h-[70vh]'>
      <h5 
        className='p-3 text-center w-full absolute top-0 cursor-pointer' 
        onClick={() => setFinishRidePanel(false)}
      >
        <i className='text-3xl text-gray-400 ri-arrow-down-wide-line'></i>
      </h5>
      
      <div className='flex flex-col items-center justify-center flex-grow'>
        <h3 className='text-3xl font-semibold text-gray-800 mb-6'>Finish This Ride</h3>
        
        <div className='flex items-center justify-between w-full p-4 border-2 border-yellow-400 rounded-lg bg-white shadow-md'>
          <div className='flex items-center gap-4'>
            <img 
              className='h-14 w-14 rounded-full object-cover' 
              src={ride?.user?.profilePic || '/images/default-avatar.png'}
              alt={ride?.user?.fullname?.firstname || 'Rider'} 
            />
            <h2 className='text-xl font-medium text-gray-700'>
              {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
            </h2>
          </div>
          <h5 className='text-lg font-semibold text-gray-600'>
            {ride?.distance ? `${ride.distance} KM` : 'Distance N/A'}
          </h5>
        </div>

        <div className='w-full mt-6 bg-white rounded-lg shadow-md p-5'>
          <div className='flex items-center gap-4 p-3 border-b'>
            <i className='text-xl text-gray-600 ri-map-pin-user-fill'></i>
            <div>
              <h3 className='text-lg font-medium text-gray-700'>Pickup Location</h3>
              <p className='text-sm text-gray-500'>{ride?.pickup || 'N/A'}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-3 border-b'>
            <i className='text-xl text-gray-600 ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium text-gray-700'>Drop Location</h3>
              <p className='text-sm text-gray-500'>{ride?.destination || 'N/A'}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-3'>
            <i className='text-xl text-gray-600 ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium text-gray-700'>₹{ride?.fare || '0'}</h3>
              <p className='text-sm text-gray-500'>Cash Payment</p>
            </div>
          </div>
        </div>

        {error && (
          <div className='mt-4 w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
            {error}
          </div>
        )}

        <div className='mt-8 w-full'>
          <button 
            onClick={endRide} 
            disabled={loading}
            className='w-full flex justify-center items-center bg-black text-white font-semibold p-3 rounded-lg hover:bg-gray-800 transition duration-300 disabled:opacity-50'
          >
            {loading ? (
              <span className='flex items-center gap-2'>
                <i className='ri-loader-4-line animate-spin'></i>
                Finishing Ride...
              </span>
            ) : (
              'Finish Ride'
            )}
          </button>
          <p className='mt-4 text-xs text-center text-gray-500'>
            Click on Finish Ride after completing the payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;

import React from 'react';
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
  return (
    <div className='flex flex-col bg-gray-100 p-6 min-h-[70vh]'>
      <h5 
        className='p-3 text-center w-full absolute top-0 cursor-pointer' 
        onClick={() => props.setFinishRidePanel(false)}
      >
        <i className='text-3xl text-gray-400 ri-arrow-down-wide-line'></i>
      </h5>
      
      <div className='flex flex-col items-center justify-center flex-grow'>
        <h3 className='text-3xl font-semibold text-gray-800 mb-6'>Finish This Ride</h3>
        
        <div className='flex items-center justify-between w-full p-4 border-2 border-yellow-400 rounded-lg bg-white shadow-md'>
          <div className='flex items-center gap-4'>
            <img 
              className='h-14 w-14 rounded-full object-cover' 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGa8nbA4_Y8eEKDf7xiwty91QSKdjt77_UwQ&s" 
              alt="Rider"
            />
            <h2 className='text-xl font-medium text-gray-700'>Rider's Name</h2>
          </div>
          <h5 className='text-lg font-semibold text-gray-600'>2.2 KM</h5>
        </div>

        <div className='w-full mt-6 bg-white rounded-lg shadow-md p-5'>
          <div className='flex items-center gap-4 p-3 border-b'>
            <i className='text-xl text-gray-600 ri-map-pin-user-fill'></i>
            <div>
              <h3 className='text-lg font-medium text-gray-700'>562/11-A</h3>
              <p className='text-sm text-gray-500'>Dadar, Mumbai</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-3 border-b'>
            <i className='text-xl text-gray-600 ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium text-gray-700'>562/11-A</h3>
              <p className='text-sm text-gray-500'>Dadar, Mumbai</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-3'>
            <i className='text-xl text-gray-600 ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium text-gray-700'>$19.20</h3>
              <p className='text-sm text-gray-500'>Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-8 w-full'>
          <Link 
            to={'/captain-dashboard'} 
            className='w-full flex justify-center bg-black text-white font-semibold p-3 rounded-lg hover:bg-gray-800 transition duration-300'
          >
            Finish Ride
          </Link>
          <p className='mt-4 text-xs text-center text-gray-500'>Click on Finish Ride if you have completed the payment</p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;

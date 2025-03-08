import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import FinishRide from '../components/FinishRide';
import { Link } from 'react-router-dom';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const FinishRidePanelRef = useRef(null);

    useEffect(() => {
        if (finishRidePanel) {
            gsap.to(FinishRidePanelRef.current, {
                transform: 'translateY(0)',
                duration: 0.5,
                ease: 'power2.out',
            });
        } else {
            gsap.to(FinishRidePanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.5,
                ease: 'power2.out',
            });
        }
    }, [finishRidePanel]);

    // Dummy driver data (Replace with actual API data)
    const driver = {
        name: 'John Doe',
        rating: 4.8,
        vehicle: 'Toyota Prius - MH 12 AB 3456',
        profilePic: '/images/driver.jpg'
    };

    return (
        <div className='h-screen relative bg-gray-100'>
            {/* Header Section */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-full bg-white shadow-md'>
                <img className='w-16' src='/images/logo.png' alt='Logo' />
                <Link to={'/captain-home'} className='h-10 w-10 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300'>
                    <i className='text-lg font-medium ri-logout-box-r-line'></i>
                </Link>
            </div>

            {/* Map Section */}
            <div className='h-4/5 pt-16'>
                <img src='/images/map.jpg' alt='Map' className='w-full h-full object-cover rounded-lg shadow-lg' />
            </div>

            {/* Yellow div for Complete Ride Button */}
            <div className='h-1/5 p-6 flex flex-col items-center justify-center bg-yellow-400 shadow-md rounded-t-lg' onClick={() => setFinishRidePanel(true)}>
                <button className='w-full mt-3 bg-black text-white font-semibold p-3 rounded-lg hover:bg-gray-800 transition duration-300'>
                    Complete Ride
                </button>
            </div>

            {/* White div for Driver Details */}
            <div className='bg-white w-full p-5 shadow-md rounded-b-lg'>
                <div className='flex items-center gap-4'>
                    <img src={driver.profilePic} alt="Driver" className='w-14 h-14 rounded-full border-2 border-gray-400 shadow-sm' />
                    <div>
                        <h4 className='text-lg font-semibold text-gray-800'>{driver.name}</h4>
                        <p className='text-gray-600 text-sm flex items-center gap-1'>
                            <i className="ri-star-fill text-yellow-500"></i> {driver.rating} ★
                        </p>
                        <p className='text-gray-600 text-sm'>{driver.vehicle}</p>
                    </div>
                </div>
            </div>

            {/* Finish Ride Panel */}
            <div ref={FinishRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-5 py-10 pt-14 translate-y-full shadow-lg rounded-t-lg'>
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    );
};

export default CaptainRiding;
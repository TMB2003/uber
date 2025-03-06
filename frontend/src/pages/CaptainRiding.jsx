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
        <div className='h-screen relative'>
            {/* Header Section */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src='/images/logo.png' alt='Logo' />
                <Link to={'/captain-home'} className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-lg font-medium ri-logout-box-r-line'></i>
                </Link>
            </div>

            {/* Map Section */}
            <div className='h-4/5'>
                <img src='/images/map.jpg' alt='Map' className='w-full h-full object-cover' />
            </div>

            {/* Yellow div for Complete Ride Button */}
            <div className='h-1/5 p-6 flex flex-col items-center justify-between bg-yellow-400'
                onClick={() => setFinishRidePanel(true)}
            >
                <button className='w-full mt-3 bg-black text-white font-semibold p-3 rounded-lg'>
                    Complete Ride
                </button>
            </div>

            {/* White div for Driver Details */}
            <div className='bg-white w-full p-5 shadow-md'>
                <div className='flex items-center gap-4'>
                    <img src={driver.profilePic} alt="Driver" className='w-12 h-12 rounded-full border-2 border-gray-400' />
                    <div>
                        <h4 className='text-lg font-semibold'>{driver.name}</h4>
                        <p className='text-gray-600 text-sm flex items-center gap-1'>
                            <i className="ri-star-fill text-yellow-500"></i> {driver.rating} ★
                        </p>
                        <p className='text-gray-600 text-sm'>{driver.vehicle}</p>
                    </div>
                </div>
            </div>

            {/* Finish Ride Panel */}
            <div ref={FinishRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full'>
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    );
};

export default CaptainRiding;

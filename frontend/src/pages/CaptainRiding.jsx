import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import FinishRide from '../components/FinishRide';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const [loading, setLoading] = useState(false);
    const FinishRidePanelRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const rideData = location.state?.ride;

    useEffect(() => {
        if (!rideData) {
            navigate('/captain-home');
        }
    }, [rideData, navigate]);

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

    const handleLogout = async () => {
        try {
            setLoading(true);
            await axios.get(`${import.meta.env.VITE_API}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!rideData) return null;

    return (
        <div className='h-screen relative bg-gray-100'>
            {/* Header Section */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-full bg-white shadow-md z-10'>
                <img className='w-16' src='/images/logo.png' alt='Logo' />
                <button 
                    onClick={handleLogout}
                    disabled={loading}
                    className='h-10 w-10 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 disabled:opacity-50'
                >
                    <i className='text-lg font-medium ri-logout-box-r-line'></i>
                </button>
            </div>

            {/* Map Section */}
            <div className='h-4/5 pt-16'>
                <div className='w-full h-full bg-gray-200 rounded-lg shadow-lg'>
                    {/* Replace with actual map integration */}
                    <div className='w-full h-full flex items-center justify-center'>
                        <p className='text-gray-500'>Map Loading...</p>
                    </div>
                </div>
            </div>

            {/* Yellow div for Complete Ride Button */}
            <div className='h-1/5 p-6 flex flex-col items-center justify-center bg-yellow-400 shadow-md rounded-t-lg'>
                <button 
                    onClick={() => setFinishRidePanel(true)}
                    className='w-full mt-3 bg-black text-white font-semibold p-3 rounded-lg hover:bg-gray-800 transition duration-300'
                >
                    Complete Ride
                </button>
            </div>

            {/* White div for Driver Details */}
            <div className='bg-white w-full p-5 shadow-md rounded-b-lg'>
                <div className='flex items-center gap-4'>
                    <img 
                        src={rideData.user.profilePic || '/images/default-avatar.png'} 
                        alt="User" 
                        className='w-14 h-14 rounded-full border-2 border-gray-400 shadow-sm object-cover'
                    />
                    <div>
                        <h4 className='text-lg font-semibold text-gray-800'>
                            {rideData.user.fullname.firstname} {rideData.user.fullname.lastname}
                        </h4>
                        <p className='text-gray-600 text-sm'>
                            {rideData.distance ? `${rideData.distance} km` : 'Calculating distance...'}
                        </p>
                        <p className='text-gray-600 text-sm'>{rideData.vehicleType}</p>
                    </div>
                </div>
            </div>

            {/* Finish Ride Panel */}
            <div 
                ref={FinishRidePanelRef} 
                className='fixed w-full z-20 bottom-0 bg-white px-5 py-10 pt-14 translate-y-full shadow-lg rounded-t-lg'
            >
                <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    );
};

export default CaptainRiding;
import React, { useState, useRef, useEffect } from 'react';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

  const RidePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null)

  useEffect(() => {
    if (ridePopUpPanel) {
      gsap.to(RidePopUpPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(RidePopUpPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [ridePopUpPanel]);

  useEffect(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src='/images/logo.png' alt='Logo' />
        <Link to={'/captain-dashboard'} className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      <div className="h-screen flex flex-col">
        {/* Map Section - Takes Available Space */}
        <div className="flex-grow relative">
          <img className="w-full h-full object-cover" src="/images/map.jpg" alt="Map" />
        </div>

        {/* Captain Details - Stays at the Bottom */}
        <div className="p-6 bg-white shadow-md">
          <CaptainDetails />
        </div>
      </div>


      <div ref={RidePopUpPanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full'>
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed h-screen w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full'>
        <ConfirmRidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;

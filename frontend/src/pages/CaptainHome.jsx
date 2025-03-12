import React, { useState, useRef, useEffect, useContext } from 'react';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null)

  const RidePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        socket.emit('update-location-captain', {
          userId: captain._id,
          location: {
            ltd: position.coords.ltd,
            lng: position.coords.lng
          }
        })
      })
    }
  }

  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_API}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopUpPanel(true)
  })

  useEffect(() => [
    socket.emit('join', { userId: captain._id, userType: 'captain' })
  ])

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
        <RidePopUp confirmRide={confirmRide} ride={ride} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed h-screen w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full'>
        <ConfirmRidePopUp ride={ride} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;

import React, { useRef, useState, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css';
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import vehiclePanel from '../components/vehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [getVehicle, setGetVehicle] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const getVehicleRef = useRef(null);
  const waitingForDriverRef = useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '76%',
        padding: 2,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(function () {
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[vehiclePanelOpen])

  useGSAP(function () {
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[confirmRidePanel])

  useGSAP(function () {
    if(getVehicle){
      gsap.to(getVehicleRef.current, {
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(getVehicleRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[getVehicle])

  useGSAP(function () {
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[waitingForDriver])

  return (
    <div className="h-screen relative flex flex-col">
      {/* Background Image */}
      <img
        src="/images/map.jpg"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        alt="Map Background"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-10"></div>
      {/* Uber Logo */}
      <img
        className="w-24 absolute top-6 left-6 sm:w-28 drop-shadow-lg"
        src="/images/logo.png"
        alt="Uber Logo"
      />
      {/* Search Box */}
      <div className={`flex flex-col ${panelOpen ? 'justify-start' : 'justify-end'} h-screen relative top-0 w-full`}>
        <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className="absolute top-3 right-3 text-xl">
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
        <div className={`h-[${panelOpen ? '72%' : '30%'}] p-5 bg-white shadow-lg`}>
          <h4 className="text-2xl font-bold text-gray-800">Find a Ride</h4>

          <form onSubmit={submitHandler} className="mt-4 relative">
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full mb-4 px-4 py-3 text-lg bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Pickup Location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full mt-4 px-4 py-3 text-lg bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Destination Location"
            />
          </form>
        </div>

        {/* Animated Panel */}
        <div ref={panelRef} className="bg-white w-full absolute bottom-0 left-0 overflow-hidden">
          {/* Additional content can be added here */}
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full'>
        <vehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <ConfirmedRide setConfirmRidePanel={setConfirmRidePanel} setGetVehicle={setGetVehicle} />
      </div>
      <div ref={getVehicleRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <LookingForDriver setGetVehicle={setGetVehicle} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 '>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;

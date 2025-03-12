import React, { useRef, useState, useEffect, useContext } from 'react';
import 'remixicon/fonts/remixicon.css';
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmPanel, setConfirmPanel] = useState(false);
  const [getVehicle, setGetVehicle] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [isPickupFocused, setIsPickupFocused] = useState(false);
  const [isDestinationFocused, setIsDestinationFocused] = useState(false);
  const [fare, setFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const vehiclePanelRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const getVehicleRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit('join', { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    navigate('/riding', {state: {ride}})
  })

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

  useEffect(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [vehiclePanelOpen]);

  useEffect(() => {
    if (confirmPanel) {
      gsap.to(confirmPanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(confirmPanelRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [confirmPanel]);

  useEffect(() => {
    if (getVehicle) {
      gsap.to(getVehicleRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(getVehicleRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [getVehicle]);

  useEffect(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [waitingForDriver]);

  const fetchSuggestions = async (query, isPickup) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const suggestions = response.data;
      if (isPickup) {
        setPickupSuggestions(suggestions);
      } else {
        setDestinationSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (isPickupFocused) {
      setPickup(suggestion);
      setPickupSuggestions([]);
    } else if (isDestinationFocused) {
      setDestination(suggestion);
      setDestinationSuggestions([]);
    }
    setPanelOpen(false);
  };

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(`${import.meta.env.VITE_API}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_API}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

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

          <form className="mt-4 relative">
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                fetchSuggestions(e.target.value, true);
              }}
              onFocus={() => setIsPickupFocused(true)}
              onBlur={() => setIsPickupFocused(false)}
              className="w-full mb-4 px-4 py-3 text-lg bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Pickup Location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                fetchSuggestions(e.target.value, false);
              }}
              onFocus={() => setIsDestinationFocused(true)}
              onBlur={() => setIsDestinationFocused(false)}
              className="w-full mt-4 px-4 py-3 text-lg bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Destination Location"
            />
          </form>
          <button onClick={findTrip} className='w-full bg-black text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-800 transition duration-300 text-center'>
            Find Trip
          </button>
        </div>

      </div>

      {/* Animated Panels */}
      <div ref={panelRef} className="bg-white w-full absolute bottom-0 left-0 overflow-hidden">
        <LocationSearchPanel
          suggestions={isPickupFocused ? pickupSuggestions : destinationSuggestions}
          handleSuggestionSelect={handleSuggestionSelect}
          setPanelOpen={setPanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full'>
        <VehiclePanel
          selectVehicle={setVehicleType}
          setConfirmPanel={setConfirmPanel}
          fare={fare}
          setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>
      <div ref={confirmPanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <ConfirmedRide
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setConfirmPanel={setConfirmPanel}
          setGetVehicle={setGetVehicle} />
      </div>
      <div ref={getVehicleRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <LookingForDriver
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          setGetVehicle={setGetVehicle} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full'>
        <WaitingForDriver
          ride={ride}
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;

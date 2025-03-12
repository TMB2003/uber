import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext';

const Riding = () => {
    const location = useLocation();
    const {ride } = location.state|| {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate();

    socket.on('ride-ended', () => {
        navigate('/home')
    })

    return (
        <div className='h-screen flex flex-col'>
            <Link to={'/home'} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className='text-lg font-medium ri-home-5-line'></i>
            </Link>
            
            {/* Image Container */}
            <div className='h-2/3 flex-grow-0'>
                <img className='w-full h-full object-cover' src="/images/map.jpg" alt="" />
            </div>

            {/* Details Container */}
            <div className='h-1/3 flex-grow-0 p-4 bg-white'>
                <div className='flex items-center justify-between'>
                    <img className='h-10' src="/images/car.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Swift Dzire</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between items-center flex-row'>

                    <div className='w-full mt-5 flex justify-between items-center flex-row'>
                        <div className='flex items-center gap-5 p-3'>
                            <i className='ri-map-pin-2-fill'></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className='ri-currency-line'></i>
                            <div>
                                <h3 className='text-lg font-medium'>{ride?.fare}</h3>
                                <p className='text-sm -mt-1'>Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-black text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding

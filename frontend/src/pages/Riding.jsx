import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
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
                        <h2 className='text-lg font-medium'>Taha</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>MH01 AB 1234</h4>
                        <p className='text-sm text-gray-600'>Swift Dzire</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between items-center flex-row'>

                    <div className='w-full mt-5 flex justify-between items-center flex-row'>
                        <div className='flex items-center gap-5 p-3'>
                            <i className='ri-map-pin-2-fill'></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1'>Dadar, Mumbai</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className='ri-currency-line'></i>
                            <div>
                                <h3 className='text-lg font-medium'>$19.20</h3>
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

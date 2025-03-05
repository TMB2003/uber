import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <div>
                <h5 className='p-3 text-center w-[93%] absolute top-0' onClick={() => {
                    props.setRidePopUpPanel(false);
                }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
                <h3 className='text-2xl font-semibold mb-5 '>New Rides Available</h3>
                <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                    <div className='flex items-center gap-3'>
                        <img className='h-12 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGa8nbA4_Y8eEKDf7xiwty91QSKdjt77_UwQ&s" alt="" />
                        <h2 className='text-xl font-medium'>Rider's Name</h2>
                    </div>
                    <h5 className='text-lg font-semibold'>2.2 KM</h5>
                </div>
                <div className='flex gap-2 justify-between items-center flex-col'>

                    <div className='w-full mt-5 flex justify-between items-center'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className='ri-map-pin-user-fill'></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1'>Dadar, Mumbai</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
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
                    <div className='flex w-full items-center justify-between'>
                        <button onClick={() => {
                            props.setRidePopUpPanel(false);
                        }} className='w-full mt-1 bg-gray-400 text-gray-700 font-semibold px-8 p-3 rounded-lg'>
                            Ignore
                        </button>
                        <button onClick={() => {
                            props.setConfirmRidePopUpPanel(true)
                        }} className='mt-5 bg-black text-white font-semibold p-3 px-8 rounded-lg'>
                            Accept Ride
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp
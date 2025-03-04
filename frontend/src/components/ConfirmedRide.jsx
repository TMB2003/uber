import React from 'react'

const ConfirmedRide = () => {
    return (
        <div>
            <h5 className='p-3 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanelOpen(false)
            }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5 '>Confirm your Ride</h3>
            <div className='flex gap-2 justify-between items-center flex-col'>
                <img className='h-20 ' src="/images/car.png" alt="" />
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
                <button onClick={()=>{
                    props.setGetVehicle(true)
                    props.setConfirmRidePanel(false)
                }} className='w-full mt-5 bg-black text-white font-semibold p-2 rounded-lg'>Confirm Ride</button>
            </div>
        </div>
    )
}

export default ConfirmedRide
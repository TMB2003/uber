import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-3 text-center w-[93%] absolute top-0' onClick={() => {
                props.setGetVehicle(false)
            }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5 '>Looking for a Driver</h3>
            <div className='flex gap-2 justify-between items-center flex-col'>
                <img className='h-20 ' src="/images/car.png" alt="" />
                <div className='w-full mt-2 justify-between items-center'>
                    <div className='flex items-center gap-5 p-3 border-t border-gray-300'>
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-bold'>562/11-A</h3>
                            <p className='text-sm -mt-1'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t border-gray-300'>
                        <i className='ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-bold'>562/11-A</h3>
                            <p className='text-sm -mt-1'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t border-gray-300'>
                        <i className='ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-bold'>{props.fare[props.vehicleType]}</h3>
                            <p className='text-sm -mt-1'>Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver
import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-3 text-center w-[93%] absolute top-0' onClick={() => {
                props.WaitingForDriver(false)
            }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>

            <div className='flex items-center justify-between'>
                <img className='h-10 ' src="/images/car.png" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium '>Taha</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>MH01 AB 1234</h4>
                    <p className='text-sm text-gray-600'>Swift Dzire</p>
                </div>
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
            </div>
        </div>
    )
}

export default WaitingForDriver
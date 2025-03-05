import React, { useState } from 'react'
import FinishRide from '../components/FinishRide';
import { Link } from 'react-router-dom';

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const FinishRidePanelRef = useRef(null)

    useEffect(() => {
        if (finishRidePanel) {
            gsap.to(FinishRidePanelRef.current, {
                transform: 'translateY(0)',
                duration: 0.5,
                ease: 'power2.out',
            });
        } else {
            gsap.to(FinishRidePanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.5,
                ease: 'power2.out',
            });
        }
    }, [finishRidePanel]);

    return (
        <div className='h-screen relative'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src='/images/logo.png' alt='Logo' />
                <Link to={'/captain-home'} className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-lg font-medium ri-logout-box-r-line'></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img src='/images/map.jpg' alt='Map' />
            </div>
            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'
                onClick={()=>{
                    setFinishRidePanel(true)
                }}
            >
                <h5 className='p-3 text-center w-[93%] absolute top-0' onClick={() => {

                }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
                <h4 className='text-xl font-semibold'>4 km Away</h4>
                <button className='w-full flex justify-center mt-5 bg-black text-white font-semibold p-2 rounded-lg'>Complete Ride</button>
            </div>
            <div ref={FinishRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full'>
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}

export default CaptainRiding
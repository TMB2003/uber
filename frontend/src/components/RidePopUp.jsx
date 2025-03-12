import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const RidePopUp = (props) => {
    const popupRef = useRef(null);

    useEffect(() => {
        // Animate pop-up from bottom to center
        gsap.fromTo(
            popupRef.current,
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
        );
    }, []);

    const closePopup = () => {
        gsap.to(popupRef.current, {
            y: "100%",
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => props.setRidePopUpPanel(false),
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                ref={popupRef}
                className="bg-white p-6 rounded-2xl shadow-lg w-[90%] sm:w-[60%] lg:w-[40%] max-h-[80vh] overflow-y-auto 
                fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
            >
                {/* Close Button */}
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 transition"
                    onClick={closePopup}
                >
                    <i className="text-3xl ri-close-line"></i>
                </button>

                <h3 className="text-2xl font-bold text-center mb-5">New Rides Available</h3>

                {/* Rider Information */}
                <div className="flex items-center justify-between p-4 bg-yellow-400 rounded-lg shadow">
                    <div className="flex items-center gap-4">
                        <img
                            className="h-14 w-14 rounded-full object-cover border-2 border-white"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGa8nbA4_Y8eEKDf7xiwty91QSKdjt77_UwQ&s"
                            alt="Rider"
                        />
                        <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                    </div>
                    <h5 className="text-lg font-semibold">2.2 KM</h5>
                </div>

                {/* Ride Details */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-4 p-3 border-b">
                        <i className="text-xl ri-map-pin-user-fill text-blue-500"></i>
                        <div>
                            <h3 className="text-lg font-semibold">562/11-A</h3>
                            <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 border-b">
                        <i className="text-xl ri-map-pin-2-fill text-red-500"></i>
                        <div>
                            <h3 className="text-lg font-semibold">562/11-A</h3>
                            <p className="text-sm text-gray-600">{props.ride?.destination}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3">
                        <i className="text-xl ri-currency-line text-green-500"></i>
                        <div>
                            <h3 className="text-lg font-semibold">{props.ride?.fare}</h3>
                            <p className="text-sm text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-between gap-4">
                    <button
                        className="w-1/2 bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-400 transition"
                        onClick={closePopup}
                    >
                        Ignore
                    </button>
                    <button
                        className="w-1/2 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition"
                        onClick={() => {
                            closePopup();
                            props.setConfirmRidePopUpPanel(true);
                            props.confirmRide();
                        }}
                    >
                        Accept Ride
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RidePopUp;

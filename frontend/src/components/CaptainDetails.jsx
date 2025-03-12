import React, {useContext} from "react";
import {CaptainDataContext} from "../context/CaptainContext"

const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext)


  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Driver Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAp3Z1hXfTVTKtbw3vE75-rtfr1ZCFcPSw4A&s"
            alt="Driver"
          />
          <h4 className="text-lg capitalize font-medium">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
        </div>

        <div className="text-right">
          <h4 className="text-2xl font-semibold">$50.46</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      {/* Ride Stats */}
      <div className="flex justify-between p-4 mt-4 bg-gray-100 rounded-xl">
        <div className="text-center">
          <i className="text-3xl mb-2 text-blue-500 ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 text-green-500 ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">12</h5>
          <p className="text-sm text-gray-600">Rides Completed</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 text-yellow-500 ri-booklet-line"></i>
          <h5 className="text-lg font-medium">4.8</h5>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;

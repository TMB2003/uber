import React from 'react';


const LocationSearchPanel = (props) => {

  // sample array for location
  const locations = [
    "Matunga, Mumbai",
    "Dadar, Mumbai",
    "CSMT, Mumbai",
    "Bandra, Mumbai",
  ]

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      {/* This is just a sample data */}

      {
        locations.map(function (elem, idx) {
          return <div key={idx} onClick={() => {
            props.setVehiclePanelOpen(true)
            props.setPanelOpen(false)
          }} className='flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl  items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-12 w-12 flex items-center justify-center rounded-full shadow-md'>
              <i className='ri-map-pin-fill text-black'></i>
            </h2>
            <h4 className='font-bold text-black'>{elem}</h4>
          </div>
        })
      }
    </div>
  );
}

export default LocationSearchPanel;

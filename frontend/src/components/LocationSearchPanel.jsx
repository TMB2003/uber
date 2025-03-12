import React from 'react';

const LocationSearchPanel = (props) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      {props.suggestions && props.suggestions.length > 0 ? (
        props.suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            onClick={() => { props.handleSuggestionSelect(suggestion); }}
            className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer hover:bg-gray-50"
          >
            <div className="bg-[#eee] h-12 w-12 flex items-center justify-center rounded-full shadow-md">
              <i className="ri-map-pin-fill text-black"></i>
            </div>
            <div className="font-bold text-black">{suggestion}</div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-center py-4">
          {props.suggestions ? "No suggestions found" : "Type to search locations"}
        </div>
      )}
    </div>
  );
}

export default LocationSearchPanel;

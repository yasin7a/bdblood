import React from "react";

const SearchBar = ({ geocoderContainerRef }) => {
  return (
    <>
      <div id="geocoder" className="geocoder">
        <div ref={geocoderContainerRef} />
      </div>
    </>
  );
};

export default SearchBar;

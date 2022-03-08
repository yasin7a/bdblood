import React from "react";
import MapBar from "./MapBar";
import Map from "./Map";
const Homes = () => {
  return (
    <>
      <div className="w-full flex h-screen">
        <div className="mapbar w-1/4  h-full p-2">
          <MapBar />
        </div>
        <div className="map w-3/4 bg-orange-300 h-full">
          <Map />
        </div>
      </div>
    </>
  );
};

export default Homes;

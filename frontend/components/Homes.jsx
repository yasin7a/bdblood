import React from "react";

import MapBar from "./MapBar";
import Map from "./Map";
const Homes = () => {
  const geocoderContainerRef = React.useRef();

  return (
    <>
      <div className="w-full flex h-screen overflow-hidden">
        <div className="mapbar w-[28%]  h-full p-2 border-r border-slate-400">
          <MapBar geocoderContainerRef={geocoderContainerRef}/>
        </div>
        <div className="map w-[72%]  h-full">
          <Map geocoderContainerRef={geocoderContainerRef} />
        </div>
      </div>
    </>
  );
};

export default Homes;

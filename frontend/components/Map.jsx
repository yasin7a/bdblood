import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";

import { MdLocationPin } from "react-icons/md";
import React, { useState, useRef, useCallback } from "react";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  FullscreenControl,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import demoitem from "../data/demoitem";
const Maps = ({ geocoderContainerRef }) => {
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 23.8103,
    longitude: 90.4125,

    zoom: 10,
  });
  // const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };
  return (
    <>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAP_TOKEN}
        onClick={(e) => console.log(e)}
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAP_TOKEN}
          position="top-left"
          placeholder="Search..."
          marker={false}
          zoom={13}
        />
        <GeolocateControl
          onGeolocate={(position) => {
            console.log(position);
          }}
        />
        <FullscreenControl />

        {demoitem.map((donor, i) => {
          return (
            <div key={i}>
              <Marker
                latitude={donor.latitude}
                longitude={donor.longitude}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
                
              >
                <MdLocationPin

                  onClick={() =>
                    handleMarkerClick(
                      donor._id,
                      donor.latitude,
                      donor.longitude
                    )
                  }
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color: "red",
                    cursor: "pointer",
                  }}
                  className="marker"
                />
              </Marker>
              {donor._id === currentPlaceId && (
                <Popup
                  latitude={donor.latitude}
                  longitude={donor.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="top"
                  onClose={() => setCurrentPlaceId(null)}
                >
                  <div className="p-2 bg-white mx-w-[10rem] color3">
                    <h3 className=" text-[15px] ">Name: {donor.name}</h3>
                    <p className=" text-[14px] mt-1.5">
                      Address: {donor.address}
                    </p>
                    <p className=" text-[14px] mt-1.5">
                      Distance: {donor.distance} away from you
                    </p>
                    <p className=" text-[14px] mt-1.5">
                      Blood-group: {donor.bloodgp}
                    </p>
                    <p className=" text-[14px] mt-1.5">
                      Mobile:
                      <Link href={`tel:+88${donor.phone}`}>
                        <a className="color2 underline"> {donor.phone}</a>
                      </Link>
                    </p>
                    <p className=" text-[14px] mt-1.5">
                      Gender: {donor.gender}
                    </p>
                  </div>
                </Popup>
              )}
            </div>
          );
        })}
      </ReactMapGL>
    </>
  );
};

export default Maps;

import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL, { GeolocateControl, FullscreenControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const Maps = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,

    zoom: 14,
  });
  const geocoderContainerRef = useRef();
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

  return (
    <>
      <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
      />
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAP_TOKEN}
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
        <GeolocateControl />
        <FullscreenControl />
      </MapGL>
    </>
  );
};

export default Maps;

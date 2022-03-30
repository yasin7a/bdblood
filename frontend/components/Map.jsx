import Link from "next/link";
import axios from "axios";

import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  FullscreenControl,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { MdLocationPin } from "react-icons/md";

const Maps = ({ geocoderContainerRef }) => {
  const ref3 = useRef();
  const [items, setItems] = useState([]);
  const [datalaoder, SetDataLoader] = useState(false);

  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 23.8103,
    longitude: 90.4125,
    zoom: 10,
  });
  const mapRef = useRef();
  let bounds = mapRef.current?.getMap()?.getBounds();

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

  useEffect(() => {
    function bodybubble(event) {
      if (ref3.current && !ref3.current.contains(event.target)) {
        setCurrentPlaceId(null);
      }
    }
    document.body.addEventListener("click", bodybubble);
    return () => {
      document.body.removeEventListener("click", bodybubble);
    };
  }, []);
  useEffect(() => {
    SetDataLoader(true);
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER}/api/donors/map`,
      params: {
        bl_latitude: bounds?._sw.lat,
        bl_longitude: bounds?._ne.lng,
        tr_longitude: bounds?._sw.lng,
        tr_latitude: bounds?._ne.lat,
      },
    })
      .then((res) => {
        setItems(res.data.donarMap);
        console.log(res.data.donarMap);
        SetDataLoader(false);
      })
      .catch((e) => console.log(e));
  }, [bounds?._ne.lat, bounds?._ne.lng, bounds?._sw.lat, bounds?._sw.lng]);
  return (
    <>
      {datalaoder && "loading..."}
      <ReactMapGL
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
        <GeolocateControl
          onGeolocate={(position) => {
            console.log(position);
          }}
        />
        <FullscreenControl />
        <div ref={ref3}>
          {items?.length === 0 ? (
            <div>Loading...</div>
          ) : (
            items?.map((donor, i) => {
              return (
                <div key={i}>
                  <Marker
                    latitude={Number(donor.latitude)}
                    longitude={Number(donor.longitude)}
                    offsetLeft={-3.5 * viewport.zoom}
                    offsetTop={-7 * viewport.zoom}
                  >
                    <MdLocationPin
                      onClick={() =>
                        handleMarkerClick(
                          donor._id,
                          Number(donor.latitude),
                          Number(donor.longitude)
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
                      latitude={Number(donor.latitude)}
                      longitude={Number(donor.longitude)}
                      closeButton={true}
                      closeOnClick={false}
                      anchor="top"
                      onClose={() => setCurrentPlaceId(null)}
                    >
                      <div className="p-2 bg-white mx-w-[10rem] color3">
                        <h3 className=" text-[15px] ">Name: {donor.name}</h3>
                        <p className=" text-[14px] mt-1.5">
                          Address: {donor.location}
                        </p>
                        <p className=" text-[14px] mt-1.5">
                          {/* Distance: {donor.distance} away from you */}
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
            })
          )}
        </div>
      </ReactMapGL>
    </>
  );
};

export default Maps;

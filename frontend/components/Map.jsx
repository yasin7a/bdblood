import axios from "axios";
import GoogleMapReact from "google-map-react";
import React, { useState, useEffect } from "react";

const Marker = () => (
  <img src="/img/marker.svg" alt="marker" width="30px" height="30px" />
);
const Maps = ({coords, setCoords}) => {
  const [items, setItems] = useState([]);
  const [datalaoder, SetDataLoader] = useState(false);
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    if (bounds) {
      SetDataLoader(true);
      axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_SERVER}/api/donors/map`,
        params: {
          bl_latitude: bounds?.sw?.lat,
          bl_longitude: bounds?.ne?.lng,
          tr_longitude: bounds?.sw?.lng,
          tr_latitude: bounds?.ne?.lat,
        },
      })
        .then((res) => {
          setItems(res.data.donarMap);
          SetDataLoader(false);
        })
        .catch((e) => console.log(e));
    }
  }, [bounds]);
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        }}
        defaultCenter={{ lat: 23.8103, lng: 90.4125 }}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        {items?.length &&
          items?.map((item) => (
            <Marker
              lat={Number(item.latitude)}
              lng={Number(item.longitude)}
              key={item._id}
            />
          ))}
      </GoogleMapReact>
      {datalaoder && "loading..."}
    </>
  );
};

export default Maps;

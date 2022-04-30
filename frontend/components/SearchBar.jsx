import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import Script from "next/script";
const SearchBar = ({setCoords}) => {
  const [autocomplete, setAutocomplete] = React.useState(null);
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        strategy="beforeInteractive"
      />

      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div className="w-full px-3">
          <input
            type="text"
            placeholder="Search Places..."
            className="w-full px-2 color2 placeholder:italic placeholder:text-slate-400 rounded-md focus:outline-none  focus:ring-2 focus:ring-red-300"
          />
        </div>
      </Autocomplete>
    </>
  );
};

export default SearchBar;

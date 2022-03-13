import React from "react";
import Header from "./Header";
import MapBar from "./MapBar";
import Map from "./Map";

const Homes = ({ donorData }) => {
  const geocoderContainerRef = React.useRef();
  const [select, SetSelect] = React.useState("");

  let selecBloodtHandler = (e) => {
    SetSelect(e.target.value);
  };
  let [toggle, setToggle] = React.useState(true);
  let handleToggleList = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <div className="flex flex-col h-screen justify-between">
          <Header geocoderContainerRef={geocoderContainerRef} />

          <div
            className={`mapbar bg-gray-200 max-w-md  h-[30rem] p-2 border relative z-10 m-2 rounded border-slate-300 shadow-[0_5px_10px_-8px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out  ${
              toggle ? "translate-y-full" : "translate-y-0"
            }`}
          >
            <MapBar
              geocoderContainerRef={geocoderContainerRef}
              donorData={donorData}
              selecBloodtHandler={selecBloodtHandler}
              handleToggleList={handleToggleList}
              toggleIcon={toggle}
            />
          </div>
        </div>
        <div className="map w-full h-full fixed inset-0 z-0">
          <Map
            geocoderContainerRef={geocoderContainerRef}
            donorData={donorData}
          />
        </div>
      </div>
    </>
  );
};

export default Homes;

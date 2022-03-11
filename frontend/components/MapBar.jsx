import React from "react";
import Header from "./Header";

import demoitem from "../data/demoitem";
import DonorList from "./DonorList";
const MapBar = ({ geocoderContainerRef }) => {
  const [select, SetSelect] = React.useState("");

  let selectHandler = (e) => {
    SetSelect(e.target.value);
  };
  return (
    <>
      <Header geocoderContainerRef={geocoderContainerRef} />

      <div className="flex justify-between items-center mt-7 mb-2">
        <div className="header color4 font-medium">
          <h3 className=" color4 font-medium">Donor List</h3>
        </div>
        <div className="blood-selector">
          <div className="selectbox z-0">
            <select
              name="selectbox"
              className="font-Roboto text-gray-700 font-normal"
              onChange={selectHandler}
            >
              <option value="A+">A+</option>
              <option value="A−">A−</option>
              <option value="B+">B+</option>
              <option value="B−">B−</option>
              <option value="AB+">AB+</option>
              <option value="AB−">AB−</option>
              <option value="O+">O+</option>
              <option value="O−">O−</option>
            </select>
          </div>
        </div>
      </div>
      <div className="h-full overflow-y-scroll py-1 hidebar">
        {demoitem.map((donor, i) => {
          return (
            <div key={i}>
              <DonorList donor={donor} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MapBar;

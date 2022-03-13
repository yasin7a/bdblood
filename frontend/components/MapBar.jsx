import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DonorList from "./DonorList";

const MapBar = ({ donorData, selecBloodtHandler, handleToggleList,toggleIcon }) => {
  return (
    <>
      <div
        className="absolute right-3 top-[-1.6rem] bg-gray-200 rounded px-3  border border-slate-300 border-b-0 rounded-br-none rounded-bl-none text-[1.6rem] color4 cursor-pointer"
        onClick={handleToggleList}
      >
        <MdOutlineKeyboardArrowDown
          className={`transition-transform duration-300 ease-out ${
            toggleIcon ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div className="flex justify-between items-center mt-2 mb-2">
        <div className="header color4 font-medium">
          <h3 className=" color4 font-medium">Donor List</h3>
        </div>
        <div className="blood-selector">
          <div className="selectbox z-0">
            <select
              name="selectbox"
              className="font-Roboto text-gray-700 font-normal"
              onChange={selecBloodtHandler}
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
      <div className="h-[25rem] overflow-y-scroll py-1 hidebar">
        {donorData?.length === 0 ? (
          <div>Loading...</div>
        ) : (
          donorData?.map((donor, i) => {
            return (
              <div key={i}>
                <DonorList donor={donor} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default MapBar;

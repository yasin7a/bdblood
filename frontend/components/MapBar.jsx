import React from "react";
import Header from "./Header";
import Link from "next/link";
import { MdOutlineCall } from "react-icons/md";
const MapBar = () => {
  const [select, SetSelect] = React.useState("");

  let selectHandler = (e) => {
    SetSelect(e.target.value);
  };
  console.log(select);
  return (
    <>
      <Header />

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

      <div className="show-list flex justify-start items-center bg-white shadow-[0_5px_10px_-8px_rgba(0,0,0,0.3)] p-2 rounded gap-5 mb-2">
        <span className="bg-slate-400 text-gray-700  text-center w-[40px] h-[40px] rounded-full py-[8px] px-[7px] select-none">
          AB+
        </span>
        <div className="details select-none">
          <h3 className="address text-[15px] color1 truncate max-w-[10.6rem]">
            Dhaka, Gazipur, Tongi
          </h3>
          <div className="flex items-center">
            <p className="name text-[13px] inline-block color1 truncate max-w-[5rem]">
              Al Mamun
            </p>
            <span className="distance text-[11px] color2 pl-2 pt-[3px]">
              • 500m Away
            </span>
          </div>
        </div>
        <div className="call-donar ml-auto">
          <Link href="tel:+8801747732587">
            <a className="call color1 flex items-center px-2 py-1 gap-1.5 rounded border border-gray-400">
              <MdOutlineCall className="text-[20px]" />
              <span>Call</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MapBar;

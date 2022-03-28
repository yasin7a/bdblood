import React from "react";
import Link from "next/link";
import { MdOutlineCall } from "react-icons/md";
const DonorList = ({ donor }) => {
  const [isOpen, setOpen] = React.useState(false);
  const ref = React.useRef();

  let handleToggle = () => {
    setOpen(!isOpen);
  };
  React.useEffect(() => {
    function bodybubble(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.body.addEventListener("click", bodybubble);
    return () => {
      document.body.removeEventListener("click", bodybubble);
    };
  }, []);
  return (
    <>
      <div
        className={`popuplist select-none  bg-white shadow-lg z-30  rounded w-full  border rounded-br-none rounded-bl-none accordion-item ${
          !isOpen ? "collapsed" : ""
        }`}
      >
        <div className="p-2">
          <h3 className="color1 text-[15px] ">Name: {donor.name}</h3>
          <p className="color1 text-[14px] mt-1.5">Address: {donor.location}</p>
          <p className="color2 text-[14px] mt-1.5">
            Distance: {donor.distance} away from you
          </p>
          <p className="color2 text-[14px] mt-1.5">
            Blood-group: {donor.bloodgp}
          </p>
          <p className="color2 text-[14px] mt-1.5">Mobile: +88{donor.phone}</p>
          <p className="color2 text-[14px] mt-1.5">Gender: {donor.gender}</p>
        </div>
      </div>
      <div
        className="show-list flex justify-start items-center bg-white shadow-[0_5px_10px_-8px_rgba(0,0,0,0.3)] p-2 rounded-sm gap-5 mb-3 capitalize rounded-tr-none rounded-tl-none"
        ref={ref}
      >
        <span className="bg-gray-400 text-gray-700 text-center w-[40px] h-[40px] rounded-full py-[8px] px-[7px] select-none ">
          {donor.bloodgp}
        </span>
        <div
          className="details select-none cursor-pointer"
          onClick={handleToggle}
        >
          <h3 className="address text-[15px] color1 truncate max-w-[10.6rem]">
            {donor.location}
          </h3>
          <div className="flex items-center">
            <p className="name text-[13px] inline-block color1 truncate max-w-[5rem]">
              {donor.name}
            </p>

            <span className="distance text-[11px] color2 pl-2 pt-[3px]">
              • {donor.distance ? "" : 0} Away
            </span>
          </div>
        </div>

        <div className="call-donar ml-auto">
          <Link href={`tel:+88${donor.phone}`}>
            <a className="call color1 flex items-center px-2 py-1 gap-1.5 rounded border border-gray-400 hover:bg-gray-200">
              <MdOutlineCall className="text-[20px]" />
              <span>Call</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DonorList;

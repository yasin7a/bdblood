import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import MapBar from "./MapBar";
import Map from "./Map";
import cookie from "js-cookie";
const Homes = () => {
  const [userinfo, setUserInfo] = useState(null);
  const [coords, setCoords] = useState({ lat: 23.8103, lng: 90.4125 });

  let [toggle, setToggle] = useState(true);
  let handleToggleList = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    try {
      const getUsers = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/login`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.get("authToken")}`,
          },
          credentials: "include",
        });
        let data = await res.json();
        setUserInfo(data.donor);
      };

      if (cookie.get("authToken")) {
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <div className="flex flex-col h-screen justify-between">
          <Header userinfo={userinfo} setCoords={setCoords} />

          <div
            className={`mapbar bg-gray-200 max-w-md  h-[30rem] p-2 border relative z-10 m-2 rounded border-slate-300 shadow-[0_5px_10px_-8px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out  ${
              toggle ? "translate-y-full" : "translate-y-0"
            }`}
          >
            <MapBar handleToggleList={handleToggleList} toggleIcon={toggle} />
          </div>
          <div className="map w-full h-full fixed inset-0 z-0">
            <Map coords={coords} setCoords={setCoords} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homes;

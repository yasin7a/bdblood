import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import MapBar from "./MapBar";
import Map from "./Map";
import axios from "axios";
import cookie from "js-cookie";

const Homes = ({ donorData }) => {
  const geocoderContainerRef = useRef();
  const [select, SetSelect] = useState("");
  const [userinfo, setUserInfo] = useState(null);
  let selecBloodtHandler = (e) => {
    SetSelect(e.target.value);
  };
  let [toggle, setToggle] = useState(true);
  let handleToggleList = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    try {
      const getUsers = async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/api/login`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${cookie.get("authToken")}` },
          }
        );
        setUserInfo(res.data.donor);
        console.log(res.data.donor);
      };

      getUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <div className="flex flex-col h-screen justify-between">
          <Header
            geocoderContainerRef={geocoderContainerRef}
            userinfo={userinfo}
          />

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

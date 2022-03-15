import React from "react";
import Menu from "./Menu";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
const Header = ({ geocoderContainerRef, userinfo }) => {
  return (
    <>
      <header className=" relative z-50 max-w-md flex justify-between px-3 m-2 py-[5px] items-center bg-white rounded-md shadow-[0_5px_10px_-8px_rgba(0,0,0,0.3)]">
        <Menu />
        <SearchBar geocoderContainerRef={geocoderContainerRef} />
        <Profile userinfo={userinfo} />
      </header>
    </>
  );
};

export default Header;

import React from "react";
import Menu from "./Menu";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
const Header = () => {
  return (
    <>
      <header className="flex justify-between p-2 items-center bg-white rounded-md shadow-[0_5px_10px_-8px_rgba(0,0,0,0.3)]">
        <Menu />
        <SearchBar />
        <Profile />
      </header>
    </>
  );
};

export default Header;

import React from "react";

const SearchBar = () => {
  return (
    <>
      <input
        type="text"
        name="search"
        placeholder="Search Location..."
        className="focus:outline-none focus-visible:ring-2 rounded px-2 w-[80%]"
      />
    </>
  );
};

export default SearchBar;

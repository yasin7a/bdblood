import React, { useState, useEffect, useCallback, useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DonorList from "./DonorList";
import axios from "axios";
const MapBar = ({ handleToggleList, toggleIcon }) => {
  const [datalaoder, SetDataLoader] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setItems([]);
  }, [query]);
  useEffect(() => {
    SetDataLoader(true);

    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER}/api/donors`,
      params: { bloodgp: query, page: pageNumber },
    })
      .then((res) => {
        setItems((prev) => [...prev, ...res.data.allDonar]);
        sethasMore(res.data.allDonar.length > 0);
        SetDataLoader(false);
      })
      .catch((e) => console.log(e));
  }, [query, pageNumber]);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (datalaoder) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [datalaoder, hasMore]
  );
  let selecBloodtHandler = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };
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
              <option value="">All</option>
              <option value="Apos">A+</option>
              <option value="Aneg">A−</option>
              <option value="Bpos">B+</option>
              <option value="Bneg">B−</option>
              <option value="ABpos">AB+</option>
              <option value="ABneg">AB−</option>
              <option value="Opos">O+</option>
              <option value="Oneg">O−</option>
            </select>
          </div>
        </div>
      </div>
      <div className="h-[25rem] overflow-y-auto py-1 hidebar">
        {items?.map((donor, i) => {
          if (items.length === i + 1) {
            return (
              <div ref={lastBookElementRef} key={i}>
                <DonorList donor={donor} />
              </div>
            );
          } else {
            return (
              <div key={i}>
                <DonorList donor={donor} />
              </div>
            );
          }
        })}
        {datalaoder && <div>loading...</div>}
        {!hasMore && !datalaoder && <div>no {items.length !== 0 && "more"} result</div>}
      </div>
    </>
  );
};

export default MapBar;

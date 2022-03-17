import React, { useState } from "react";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { FiMapPin, FiLogOut } from "react-icons/fi";
import { FaHandHoldingWater } from "react-icons/fa";

const Menu = ({ userinfo, logout }) => {
  let [toggle, setToggle] = useState(false);
  let handleClick = () => {
    setToggle(true);
  };
  let handlecut = () => {
    setToggle(false);
  };

  return (
    <>
      <div className="menu">
        <div className="hamburger-icon ">
          <button onClick={handleClick}>
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
        {/*  */}
        <div
          className={`menubar z-50 w-full fixed top-0 left-0 bottom-0 h-screen ease-out ${
            !toggle && "pointer-events-none"
          }`}
        >
          <div
            className={`bg-[#000] transition-opacity duration-500 fixed z-[-1] ${
              toggle ? "w-full h-full opacity-30" : "w-0 h-0 opacity-0"
            }`}
            onClick={handlecut}
          ></div>
          <div
            className={`menu-body  bg-white w-80 h-full transition-transform duration-300 ${
              toggle ? "translate-x-0" : "-translate-x-full"
            } `}
          >
            <div className="flex py-1 px-3 justify-between items-center border-zinc-300 border-b">
              <div className="logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="48px"
                  height="48px"
                >
                  <path
                    fill="#EF0F14"
                    d="M2.861,21.998h2.917c1.05,0,2.261,0.896,2.261,2s-1.21,2-2.261,2H2.861c-1.05,0-1.861-0.895-1.861-2C1,22.893,1.811,21.998,2.861,21.998z M43.021,20.998c-1.401,0-2.521,1.343-2.521,3s1.13,3,2.521,3h4.019l0.96-1h-5c-0.898-0.047-1.289-0.638-1.5-1.5h5.54l0.96-1h-6.5c0.213-0.861,0.592-1.495,1.5-1.5h4.04l0.96-1H43.021z M34,20.998v5.426c0,0.148,0.095,0.292,0.201,0.402s0.249,0.172,0.405,0.172L38.54,27l1-1L35,25.998V21L34,20.998z M27.842,20.998c-1.591,0-2.851,1.346-2.851,3.003s1.26,2.997,2.851,2.997l3.649-0.012l1.149-0.988h-4.819c-1.05,0-1.84-0.894-1.84-1.999s0.79-2.001,1.84-2.001l3.689,0.016l1.13-1.016H27.842z M21,20.998c-0.258,0-0.522,0.215-0.67,0.483l-2.83,5.517h1l2.5-5l1.691,3H20.04l0.941,0.98l2.181-0.006l0.658,1.025l1.081-0.009l-3.277-5.507C21.394,21.112,21.25,20.998,21,20.998z M10,20.998v6h1v-5h3c0.515,0,1,0.464,1,1s-0.485,1-1,1h-2.5l3.481,3H16.5l-2.5-2l0.337-0.009C15.077,24.99,16,24.119,16,22.998c0-1.121-0.687-1.986-1.553-2H10z M2.882,20.998c-1.591,0-2.882,1.344-2.882,3s1.291,3,2.882,3H5.76c1.591,0,3.24-1.343,3.24-3s-1.649-3-3.24-3H2.882z"
                  />
                </svg>
              </div>
              <button className="cross " onClick={handlecut}>
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="24px"
                  height="24px"
                >
                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                </svg>
              </button>
            </div>

            <div className="menu-items capitalize px-5">
              <nav>
                <ul>
                  <li className="menuitem ">
                    <AiOutlineHome />
                    <Link href="/">
                      <a>home</a>
                    </Link>
                  </li>

                  {!userinfo && (
                    <>
                      <li className="menuitem">
                        <MdOutlineSwitchAccount />
                        <Link href="/register">
                          <a>donor registration</a>
                        </Link>
                      </li>
                      <li className="menuitem">
                        <AiOutlineLogin />
                        <Link href="/login">
                          <a>donor login</a>
                        </Link>
                      </li>
                    </>
                  )}

                  <li className="menuitem">
                    <FaHandHoldingWater />
                    <Link href="/request">
                      <a>request for blood</a>
                    </Link>
                  </li>
                  <li className="menuitem">
                    <FiMapPin />
                    <button onClick={handlecut}>Map</button>
                  </li>
                  <li className="menuitem">
                    <AiOutlineOrderedList />
                    <Link href="/donor-list">
                      <a>My donor list </a>
                    </Link>
                  </li>
                  {userinfo && (
                    <>
                      <li className="menuitem">
                        <FiLogOut />
                        <button onClick={logout}>Log Out</button>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

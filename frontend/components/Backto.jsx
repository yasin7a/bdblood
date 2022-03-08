import React from "react";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
const Backto = () => {
  return (
    <>
      <div className="backTo bg-white">
        <div className="p-2 text-2xl">
          <Link href="/">
            <a>
              <BiArrowBack />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Backto;

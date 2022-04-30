import React, { useEffect } from "react";
import Menu from "./Menu";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import decode from "jwt-decode";
const Header = ({  userinfo,setCoords }) => {
  const router = useRouter();

  let logout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/login`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    let data = await res.json();
    console.log(data.msg);
    cookie.remove("authToken");
    await router.push("/");
    router.reload();
  };

  useEffect(() => {
    async function autologout() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/login`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await res.json();
      console.log(data.msg);
      cookie.remove("authToken");
      await router.push("/login");
      router.reload();

    }

    const token = cookie.get("authToken");

    //JWT check if token expired
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) autologout();
    }
  }, [router]);

  return (
    <>
      <header className=" relative z-50 max-w-md flex justify-between px-3 m-2 py-[5px] items-center bg-white rounded-md shadow-[0_5px_10px_-8px_rgba(0,0,0,0.3)]">
        <Menu userinfo={userinfo} logout={logout} />
        <SearchBar setCoords={setCoords}  />
        <Profile logout={logout} userinfo={userinfo} />
      </header>
    </>
  );
};

export default Header;

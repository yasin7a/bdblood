import React, { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import SignHeader from "./SignHeader";
import Link from "next/link";
import toast from "react-hot-toast";
import cookie from "js-cookie";
const Logins = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [logLoad, setLogLoad] = useState(false);

  const [input, setInput] = React.useState({
    username: "",
    password: "",
  });
  const changeHandler = (event) => {
    setInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const loginUser = async (event) => {
    setLogLoad(true);
    event.preventDefault();
    const { username, password } = input;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/login`, {
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
      });
      const result = await res.json();

      if (result.errors) {
        setError(result.errors);
        if (result.errors.common) {
          let common = Object.values(result.errors.common);
          toast.error(common);
        }
      } else {
        if (!result.isVerified) {
          toast.success(
            "You are not a verified user! check email for verification"
          );
          toast.success(Object.values(result.message));
          router.push({
            pathname: "/verify-log",
            query: { id: result.payload.userId },
          });
        } else {
          cookie.set("authToken", result.authToken);
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLogLoad(false);
  };
  // useLayoutEffect(() => {
  //   if (true) {
  //     router.push('/');
  //   }
  // }, [router]);

  return (
    <>
      <SignHeader />
      <div className="p-4 max-w-sm mx-auto animte-flip ">
        <h4 className="text-center color3 font-medium mb-3">
          Login as a Blood Donor
        </h4>
        <div className="login">
          <form onSubmit={loginUser}>
            <div className="input-control">
              <input
                type="text"
                name="username"
                className="input-field"
                autoComplete="off"
                placeholder="username"
                value={input.username}
                onChange={changeHandler}
                style={{
                  borderColor: error.username ? "red" : "",
                }}
              />
              <label
                htmlFor="username"
                className="input-label"
                style={{
                  color: error.username ? "red" : "",
                }}
              >
                {error.username ? error.username?.msg : "Enter Email or Number"}
              </label>
            </div>

            <div className="input-control">
              <input
                type="password"
                name="password"
                className="input-field"
                value={input.password}
                onChange={changeHandler}
                placeholder="password"
                style={{
                  borderColor: error.password ? "red" : "",
                }}
              />
              <label
                htmlFor="password"
                className="input-label"
                style={{
                  color: error.password ? "red" : "",
                }}
              >
                {error.password ? error.password?.msg : "Enter Password"}
              </label>
            </div>
            <div className="text-right">
              <Link href="/forgot">
                <a className="text-[15px] color3 mt-1  hover:underline">
                  Forgot Password?
                </a>
              </Link>
            </div>

            <button type="submit" className="singBtn">
              {logLoad ? "..." : "Login"}
            </button>
          </form>
        </div>

        <p className=" text-[1rem] color3 mt-5 block text-center">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have any account?
          <Link href="/register">
            <a className="hover:underline"> Register</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Logins;

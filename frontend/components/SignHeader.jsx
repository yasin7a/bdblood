import React from "react";
import Backto from "./Backto";
import Link from "next/link";
import { useRouter } from "next/router";

const SignHeader = () => {
  const router = useRouter();

  return (
    <>
      <Backto />

      <div className="p-2">
        <div className="nav-sing p-2 max-w-sm bg-white mx-auto mt-8 rounded">
          <div className="bg-white flex justify-between text-center color3">
            <div className="w-2/4">
              <Link href="/login">
                <a
                  className={`w-full h-full block p-2 rounded-md ${
                    router.pathname == "/login" && "bg-neutral-300"
                  }`}
                >
                  Sign in
                </a>
              </Link>
            </div>
            <div className="w-2/4">
              <Link href="/register">
                <a
                  className={`w-full h-full block p-2 rounded-md ${
                    router.pathname == "/register" && "bg-neutral-300"
                  }`}
                >
                  Sign Up
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignHeader;

import React, { useState, useRef } from "react";
import Head from "next/head";
import OtpInput from "react-otp-input";

import toast from "react-hot-toast";
import { useRouter } from "next/router";
const ResetPassword = () => {
  const router = useRouter();
  const { id } = router.query;
  const [OTP, setOTP] = useState("");
  const userId = useRef();
  const [error, setError] = useState(false);

  const [verLoad, setverLoad] = useState(false);
  const [reSendLoad, setreSendLoad] = useState(false);

  const [input, setInput] = useState({ password: "", confirmPassword: "" });
  let handleChange = (otp) => setOTP(otp);

  const changeHandler = (event) => {
    setInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    setverLoad(true);
    let { password, confirmPassword } = input;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/resetPassword`,
        {
          body: JSON.stringify({
            otp: OTP,
            userId: userId.current.value,
            password,
            confirmPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: "include",
        }
      );

      const result = await res.json();

      if (result.errors) {
        console.log(result.errors);
        setError(result.errors);
        if (result.errors.otp) {
          let err = Object.values(result.errors.otp);
          toast.error(err[1]);
        }
        if (result.errors.userId) {
          let err = Object.values(result.errors.userId);
          toast.error(err[1]);
        }
        if (result.errors.common) {
          let common = Object.values(result.errors.common);
          toast.error(common);
        }
      } else {
        let msg = Object.values(result.message);
        toast.success(msg);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
    setverLoad(false);
  };

  let resendOTP = async () => {
    setreSendLoad(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/resendOTPreset`,
      {
        body: JSON.stringify({
          userId: userId.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
      }
    );

    const result = await res.json();
    if (result.errors) {
      let common = Object.values(result.errors.common);
      toast.error(common);
    } else {
      let msg = Object.values(result.message);
      toast.success(msg);
    }
    setreSendLoad(false);
  };

  return (
    <>
      <Head>
        <title>Reset password | Blood Connection</title>
      </Head>
      <div className="h-screen flex flex-col justify-center items-center mx-4">
        <div className="shadow-md bg-white p-4 min-h-[16rem] flex flex-col justify-center items-center max-w-[20rem]">
          <h1 className="color3 text-[1.2rem] mb-5">Enter OTP and password</h1>
          <form onSubmit={handleSubmit}>
            <OtpInput
              value={OTP}
              shouldAutoFocus={true}
              onChange={handleChange}
              numInputs={4}
              isInputNum={true}
              separator={<span>-</span>}
              inputStyle=" h-[3rem] mx-2 otpinp font-Roboto ring-sky-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 ring-1"
            />

            <div className="input-control">
              <input
                type="password"
                name="password"
                className="input-field"
                value={input.password}
                onChange={changeHandler}
                placeholder="password"
                autoComplete="off"
                style={{
                  borderColor: error.password ? "red" : "",
                }}
              />
              <label
                htmlFor="password"
                className="input-label "
                style={{
                  color: error.password ? "red" : "",
                  backgroundColor: "white",
                }}
              >
                {error.password ? error.password?.msg : "Enter password"}
              </label>
            </div>

            <div className="input-control">
              <input
                type="password"
                name="confirmPassword"
                className="input-field"
                value={input.confirmPassword}
                onChange={changeHandler}
                placeholder="password"
                autoComplete="off"
                style={{
                  borderColor: error.confirmPassword ? "red" : "",
                }}
              />
              <label
                htmlFor="password"
                className="input-label "
                style={{
                  color: error.confirmPassword ? "red" : "",
                  backgroundColor: "white",
                }}
              >
                {error.confirmPassword
                  ? error.confirmPassword?.msg
                  : "Enter confirm password"}
              </label>
            </div>

            <input
              type="text"
              name="userId"
              ref={userId}
              defaultValue={id}
              readOnly
              hidden
            />

            <button type="submit" className="singBtn text-center">
              {verLoad ? "..." : "Submit"}
            </button>
          </form>

          {reSendLoad ? (
            "..."
          ) : (
            <button
              className="text-[15px] color3 mt-1  hover:underline"
              onClick={resendOTP}
            >
              Re-send OTP?
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

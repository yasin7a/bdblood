import React, { useState, useRef } from "react";
import OtpInput from "react-otp-input";
import Head from "next/head";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
const Verify = () => {
  const router = useRouter();
  const { id } = router.query;

  const [OTP, setOTP] = useState("");
  const userId = useRef();
  let handleChange = (otp) => setOTP(otp);
  const [verLoad, setverLoad] = useState(false);

  let handleSubmit = async (event) => {
    event.preventDefault();
    setverLoad(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/log-verify`,
        {
          body: JSON.stringify({
            otp: OTP,
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
        let errors = Object.values(result.errors);
        if (errors[0]) {
          toast.error(errors[0].msg);
        }
        if (errors[1].msg) {
          toast.error(errors[1].msg);
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
  return (
    <>
      <Head>
        <title>Verify log | Blood Connection</title>
      </Head>
      <div className="h-screen flex flex-col justify-center items-center mx-4">
        <div className="shadow-md bg-white p-4 min-h-[16rem] flex flex-col justify-center items-center max-w-[20rem]">
          <h1 className="color3 text-[1.2rem] mb-5">
            Email verification via code
          </h1>
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
        </div>
      </div>
    </>
  );
};

export default Verify;

import React, { useState } from "react";
import Head from "next/head";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Forgotpassword = () => {
  const router = useRouter();

  const [fp, setfp] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({ email: "" });

  const changeHandler = (event) => {
    setInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  let forgotPasswordhandler = async (event) => {
    event.preventDefault();
    const { email } = input;
    setfp(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/forgotPassword`,
      {
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
      }
    );

    const result = await res.json();
    if (result.errors) {
      setError(result.errors);
      if (result.errors.common) {
        let common = Object.values(result.errors.common);
        toast.error(common);
      }
    } else {
      let msg = Object.values(result.message);
      toast.success(msg);
      router.push({
        pathname: "/reset-password",
        query: { id: result.userId },
      });
    }
    setfp(false);
  };

  return (
    <>
      <Head>
        <title>Forgot Password | Blood Connection</title>
      </Head>
      <div className="h-screen flex flex-col justify-center items-center mx-4">
        <div className="shadow-md bg-white p-4 min-h-[16rem] max-w-[20rem]">
          <h1 className="color3 text-[1.2rem] mb-5 text-center">
            Enter you email, we will sent you a email for reset password
          </h1>
          <form onSubmit={forgotPasswordhandler}>
            <div className="input-control">
              <input
                type="email"
                name="email"
                className="input-field"
                value={input.email}
                onChange={changeHandler}
                placeholder="email"
                autoComplete="off"
                style={{
                  borderColor: error.email ? "red" : "",
                }}
              />
              <label
                htmlFor="email"
                className="input-label "
                style={{
                  color: error.email ? "red" : "",
                  backgroundColor: "white",
                }}
              >
                {error.email ? error.email?.msg : "Enter Email"}
              </label>
            </div>

            {fp ? (
              "..."
            ) : (
              <button className="singBtn text-center" type="submit">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;

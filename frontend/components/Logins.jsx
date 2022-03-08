import React from "react";
import { useRouter } from "next/router";
import SignHeader from "./SignHeader";

const Logins = () => {
  const router = useRouter();
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
      });

      const result = await res.json();
      router.push("/");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SignHeader />
      <div className="p-4 max-w-sm mx-auto">
        <h4 className="text-center color3 mb-3">Login as a Blood Donor</h4>
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
                // style={{
                //   borderColor: "red",
                // }}
              />
              <label
                htmlFor="username"
                className="input-label"
                // style={{
                //   color: "red",
                // }}
              >
                {/* {error ? error : "Enter Username or Mobile"} */}
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
              />
              <label htmlFor="password" className="input-label">
                Enter Password
              </label>
            </div>

            <button
              type="submit"
              className="singBtn"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Logins;

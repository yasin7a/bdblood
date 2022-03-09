import React from "react";
import { useRouter } from "next/router";
import SignHeader from "../components/SignHeader";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "../node_modules/react-simple-captcha/react-simple-captcha";

const Registers = () => {
  const router = useRouter();
  const [input, setInput] = React.useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    bloodgp: "",
  });

  const changeHandler = (event) => {
    setInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const registerUser = async (event) => {
    event.preventDefault();
    const { name, email, phone, password, gender, bloodgp } = input;
    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_SERVER}/api/register`,
    //     {
    //       body: JSON.stringify({
    //         name,
    //         email,
    //         phone,
    //         password,
    //         gender,
    //         bloodgp,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       method: "POST",
    //     }
    //   );

    //   const result = await res.json();
    //   router.push("/login");
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
    // if (validateCaptcha()) {
    // }
  };
  React.useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);

  return (
    <>
      <SignHeader />
      <div className="p-4 max-w-sm mx-auto animte-flip">
        <h4 className="text-center color3 font-medium mb-3">
          Register as a Blood Donor
        </h4>
        <div className="register">
          <form onSubmit={registerUser}>
            <div className="input-control">
              <input
                type="text"
                name="name"
                className="input-field"
                value={input.name}
                onChange={changeHandler}
                placeholder="name"
                autoComplete="off"
              />
              <label htmlFor="name" className="input-label">
                Enter name
              </label>
            </div>
            <div className="input-control">
              <input
                type="text"
                name="phone"
                className="input-field"
                value={input.phone}
                onChange={changeHandler}
                placeholder="phone"
                autoComplete="off"
                maxLength="11"
              />

              <label htmlFor="phone" className="input-label">
                Enter Phone
              </label>
              <span className="text-xs absolute right-2 bottom-1">
                {input?.phone.length}/11
              </span>
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

            <div className="input-control">
              <input
                type="password"
                name="confirmPassword"
                className="input-field"
                value={input.confirmPassword}
                onChange={changeHandler}
                placeholder="confirmPassword"
              />
              <label htmlFor="confirmPassword" className="input-label">
                Enter Confirm Password
              </label>
            </div>

            <label className="font-medium text-[1rem] color3 mt-3 block">Blood Type</label>
            <div className="blood-group">
              <input
                type="radio"
                id="A+"
                name="bloodgp"
                value="A+"
                onChange={changeHandler}
              />
              <label htmlFor="A+">A+</label>
              <input
                type="radio"
                id="A−"
                name="bloodgp"
                value="A−"
                onChange={changeHandler}
              />
              <label htmlFor="A−">A−</label>
              <input
                type="radio"
                id="B+"
                name="bloodgp"
                value="B+"
                onChange={changeHandler}
              />
              <label htmlFor="B+">B+</label>
              <input
                type="radio"
                id="B−"
                name="bloodgp"
                value="B−"
                onChange={changeHandler}
              />
              <label htmlFor="B−">B−</label>

              <input
                type="radio"
                id="AB+"
                name="bloodgp"
                value="AB+"
                onChange={changeHandler}
              />
              <label htmlFor="AB+">AB+</label>
              <input
                type="radio"
                id="AB−"
                name="bloodgp"
                value="AB−"
                onChange={changeHandler}
              />
              <label htmlFor="AB−">AB−</label>
              <input
                type="radio"
                id="O+"
                name="bloodgp"
                value="O+"
                onChange={changeHandler}
              />
              <label htmlFor="O+">O+</label>
              <input
                type="radio"
                id="O−"
                name="bloodgp"
                value="O−"
                onChange={changeHandler}
              />
              <label htmlFor="O−">O−</label>
            </div>


            <label className="font-medium text-[1rem] color3 my-3 block">Gender</label>


            <div className="gender-field ml-3">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={changeHandler}
                checked={input.gender === "male"}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={changeHandler}
                checked={input.gender === "female"}
              />
              <label htmlFor="female">Female</label>
            </div>
            <label className="font-medium text-[1rem] color3 my-3 block">Captcha</label>

            <div className="capcha ">
              <LoadCanvasTemplate
                reloadText={`<svg  xmlns="http://www.w3.org/2000/svg" 
 width="30px" height="30px" ><path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
      </svg>`}
              />
            </div>

            <div className="input-control">
              <input
                type="text"
                id="user_captcha_input"
                name="user_captcha_input"
                className="input-field"
                placeholder="EnterCaptcha"
              />
              <label htmlFor="user_captcha_input" className="input-label">
                Enter Captcha
              </label>
            </div>

            <button type="submit" className="singBtn">
              Registers
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registers;

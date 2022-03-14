import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SignHeader from "../components/SignHeader";
import toast from "react-hot-toast";
import { BiCurrentLocation } from "react-icons/bi";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "../node_modules/react-simple-captcha/react-simple-captcha";

const Registers = () => {
  const router = useRouter();

  const [lcn, setLnc] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [lcnLoad, setLcnLoad] = useState(false);
  const [error, setError] = useState(false);
  const lcnRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();
  const user_captcha = useRef("");
  const lcnBtn = useRef(null);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    bloodgp: "",
    user_captcha_input: "",
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
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
      gender,
      bloodgp,
      user_captcha_input,
    } = input;
    if (validateCaptcha(user_captcha_input)) {
      user_captcha.current.value = "trueCaptcha";
    } else {
      user_captcha.current.value = "";
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/register`,
        {
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            confirmPassword,
            gender,
            bloodgp,
            location: lcnRef.current.value,
            latitude: latRef.current.value,
            longitude: lngRef.current.value,
            user_captcha: user_captcha.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      const result = await res.json();

      if (result.errors) {
        setError(result.errors);
        console.log(result.errors);
        console.log(result);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let lcnBtns = lcnBtn.current;
    setLcnLoad(true);

    let callLcn = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            let res = await fetch(
              `https://us1.locationiq.com/v1/reverse.php?key=${process.env.NEXT_PUBLIC_REVERSE_TOKEN}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
            );
            let data = await res.json();
            setLnc(data.display_name);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            setLcnLoad(false);
            toast.success("Location found Successfully");
          } catch (error) {
            alert(error);
          }
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    lcnBtns.addEventListener("click", callLcn);

    return () => {
      lcnBtns.addEventListener("click", callLcn);
    };
  }, []);
  useEffect(() => {
    // Captcha
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
                {error.name ? error.name?.msg : "Enter Name"}
              </label>
            </div>
            <div className="input-control">
              <input
                type="email"
                name="email"
                className="input-field"
                value={input.email}
                onChange={changeHandler}
                placeholder="email"
                autoComplete="off"
              />
              <label htmlFor="email" className="input-label">
                {error.email ? error.email?.msg : "Enter Email"}
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
                {error.phone ? error.phone?.msg : "Enter Phone"}
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
                {error.password ? error.password?.msg : "Enter Password"}
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
                {error.confirmPassword
                  ? error.confirmPassword?.msg
                  : "Enter Confirm Password"}
              </label>
            </div>

            <div className="input-control">
              <input
                type="text"
                name="location"
                className="input-field"
                defaultValue={lcn}
                ref={lcnRef}
                placeholder="location"
                readOnly
              />

              <label htmlFor="location" className="input-label">
                {error.location ? error.location?.msg : "Your Location"}
              </label>
              <button
                type="button"
                ref={lcnBtn}
                className={`absolute top-2/4 -right-3 -translate-x-1/2 -translate-y-1/2 text-xl p-2 bg-slate-200 hover:text-blue-600 ${
                  lcnLoad ? "" : "text-blue-400"
                }`}
              >
                <BiCurrentLocation />
              </button>
            </div>

            <label className="font-medium text-[1rem] color3 mt-3 block">
              {error.bloodgp ? error.bloodgp?.msg : "Blood Type"}
            </label>
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

            <div className="flex">
              <div className="gender-field ">
                <label className="font-medium text-[1rem] color3 my-3 block">
                  {error.gender ? error.gender?.msg : "Gender"}
                </label>
                <div className="ml-3">
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
              </div>

              <div>
                <label className="font-medium text-[1rem] color3 my-3 block">
                  Captcha
                </label>
                <div className="capcha ">
                  <LoadCanvasTemplate
                    reloadText={`<svg  xmlns="http://www.w3.org/2000/svg" 
 width="30px" height="30px" ><path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
      </svg>`}
                  />
                </div>
              </div>
            </div>

            <div className="input-control">
              <input
                type="text"
                id="user_captcha_input"
                name="user_captcha_input"
                className="input-field"
                value={input.user_captcha_input}
                onChange={changeHandler}
                placeholder="EnterCaptcha"
              />
              <label htmlFor="user_captcha_input" className="input-label">
                {error.user_captcha ? error.user_captcha?.msg : "Enter Captcha"}
              </label>
            </div>

            <input
              type="text"
              name="latitude"
              hidden
              defaultValue={lat}
              ref={latRef}
            />
            <input
              type="text"
              name="longitude"
              hidden
              defaultValue={lng}
              ref={lngRef}
            />
            <input type="text" name="user_captcha" ref={user_captcha} hidden />
            <button type="submit" className="singBtn">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registers;

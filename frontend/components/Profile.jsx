import React from "react";
import { CgProfile } from "react-icons/cg";
const Profile = () => {
  const [isOpen, setOpen] = React.useState(false);
  const ref2 = React.useRef();

  let handleToggle = () => {
    setOpen(!isOpen);
  };
  React.useEffect(() => {
    function bodybubble(event) {
      if (ref2.current && !ref2.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.body.addEventListener("click", bodybubble);
    return () => {
      document.body.removeEventListener("click", bodybubble);
    };
  }, []);
  return (
    <>
      <div className="profile relative" ref={ref2}>
        <div className="profile-pic cursor-pointer text-2xl">
          <CgProfile onClick={handleToggle} />
        </div>
        {true ? (
          <>
            {isOpen && (
              <>
                <div className="profile-modal p-2 bg-white shadow-md w-[15rem] h-[10rem] absolute -right-2 top-9 z-20 ">
                  <div className="flex gap-5">
                    <div>
                      <p className="color2 text-[14px] ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestias,
                      </p>
                    </div>
                    <div>
                      <input id="test1" type="checkbox" hidden="hidden" />
                      <label className="switch" htmlFor="test1"></label>
                    </div>
                  </div>

                  <div className="sign-out">
                    <button className="call text-gray-600 mt-8 mx-auto flex items-center px-2 py-1 gap-1.5 rounded border border-gray-400 hover:bg-gray-200">
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Profile;

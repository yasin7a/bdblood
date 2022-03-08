import React from "react";
import { CgProfile } from "react-icons/cg";
const Profile = () => {
  return (
    <>
      <div className="profile">
        <div className="profile-pic cursor-pointer text-2xl">
          <CgProfile />
        </div>

        <div className="profile-modal"></div>
      </div>
    </>
  );
};

export default Profile;

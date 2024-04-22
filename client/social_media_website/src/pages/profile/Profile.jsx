import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileRightbar from "../../components/profile rightbar/ProfileRightbar";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const params = useParams();
  const [userProfile, setUser] = useState({});
  const username = params.username;
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    if (file) profileUpdate();
    // eslint-disable-next-line
  },[file]);

  const profileUpdate = async () => {
    const data = new FormData();
    const fileExtension = file.name.split(".").pop();
    const fileName =
      username + "_Profile_Picture_" + Date.now() + "." + fileExtension;
    data.append("name", fileName);
    data.append("file", file);
    const newProfile = {
      userId: userProfile._id,
    };
    newProfile.profilePicture = fileName;
    dispatch({ type: "PROFILE_PICTURE", payload: fileName });
    try {
      await axios.post("/uploadProfile", data);
    } catch (err) {
      console.log(err);
    }
    try {
      await axios.put("/users/" + userProfile._id, newProfile);
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: newProfile.profilePicture,
      }));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <div className="profileSidebarContainer">
          <Sidebar />
        </div>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <Link
                to={
                  userProfile.coverPicture
                    ? PF + "person/" + userProfile.coverPicture
                    : PF + "person/noCover.jpg"
                }
              >
                <img
                  className="profileCoverImg"
                  src={
                    userProfile.coverPicture
                      ? PF + "person/" + userProfile.coverPicture
                      : PF + "person/noCover.jpg"
                  }
                  alt=""
                />
              </Link>
              <Link
                to={
                  userProfile.profilePicture
                    ? PF + "person/" + userProfile.profilePicture
                    : PF + "person/noAvatar.jpg"
                }
              >
                <img
                  className="profileUserImg"
                  src={
                    userProfile.profilePicture
                      ? PF + "person/" + userProfile.profilePicture
                      : PF + "person/noAvatar.jpg"
                  }
                  alt=""
                />
              </Link>
              { user.username === username && <form className="cameraIconClass">
                <label htmlFor="profileFile">
                  <img src={PF + "camera.png"} className="cameraIcon" alt="" />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="profileFile"
                    id="profileFile"
                    accept=".png,.jpeg,.jpg"
                    onChange={(event) => {
                      const selectedFile = event.currentTarget.files[0];
                      setFile(selectedFile);
                    }}
                  />
                </label>
              </form>}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userProfile.username}</h4>
              <span className="profileInfoDesc">{userProfile.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <div className="feedContainer">
              <Feed username={username} />
            </div>
            <div className="profileRightbarContainer">
              <ProfileRightbar user={userProfile} />
            </div>
          </div>
          <div className="feedContainerForMobile">
            <Feed username={username} />
          </div>
        </div>
      </div>
    </>
  );
}

import backarrow from "../images/arrow_forward_ios.png";
import { Link } from "react-router-dom";
import styles from "../styles/securitycomponent.module.css";
import background from "../images/changepassword.png";
import {  useState } from "react";
import axios from "axios";
import thumbpin from "../images/Thumbpin.png";


function SecurityComponent() {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));


    const sendPasswordData = async () => {
      try {
        const data = await axios.post(
          "http://localhost:8000/api/user/change_password/",
          {
            email: user.email,
            password: currentPassword,
            new_password: newPassword,
          },
          {
            withCredentials: true,
          }
        );
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div className={styles.security}>
      <img
        src={background}
        alt="background"
        className={styles.securitybackground}
      />

      <div className={styles.securitymodal}>
      <img src={thumbpin} className={styles.thumbpin} alt="thumb pin" />
        <div className={styles.profilenavigation}>
          <Link to={"/welcomeuser"} className={styles.backlink}>
            <img
              src={backarrow}
              alt="back arrow"
              className={styles.securitybackarrow}
            />
          </Link>
          <h1 className={styles.header}>Security</h1>
        </div>

        <div className={styles.userdata}>
          <input
            type="password"
            className={styles.input}
            placeholder="Current Password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="New password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Re-enter password"
          />
        </div>

        <div className={styles.changepassword}>
          <button className={styles.buttonchange} onClick={sendPasswordData}>Change password</button>
        </div>
      </div>
    </div>
  );
}

export default SecurityComponent;

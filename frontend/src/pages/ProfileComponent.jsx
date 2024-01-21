import React, { useState } from "react";
import styles from "../styles/profilecomponent.module.css";
import avatar from "../images/avatar..png";
import backarrow from "../images/arrow_forward_ios.png";
import { Link } from "react-router-dom";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    console.log(user);
  } else {
    user = null;
  }
  return user;
};

function ProfileSettingsComponent() {
  const [user] = useState(getUser());

  return (
    <div className={styles.profile}>
      <div className={styles.profilenavigation}>
        <Link to={"/welcomeuser"} className={styles.backlink}>
          <img
            src={backarrow}
            alt="back arrow"
            className={styles.profilebackarrow}
          />
        </Link>
        <h1 className={styles.header}>Profile Settings</h1>
      </div>

      <div className={styles.userdata}>
        <img src={avatar} alt="avatar" />
        <h3>Full Name</h3>
        <input
          type="text"
          className={styles.input}
          placeholder={user.full_name}
        />
        <h3>Username</h3>
        <input
          type="text"
          className={styles.input}
          placeholder={user.username}
        />
        <h3>Email</h3>
        <input type="text" className={styles.input} placeholder={user.email} />
      </div>

      <div className={styles.language}>
        <h2>Language</h2>
        <ul>
          <li className={styles.language}>English</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileSettingsComponent;

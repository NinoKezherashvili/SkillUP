import React from "react";
import Sidebar from "./Sidebar";
import styles from "../styles/profilesettings.module.css";
import ProfileSettingsComponentAdmin from "./ProfileComponentAdmin";

const ProfileSettingsAdmin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.content}>
        <ProfileSettingsComponentAdmin />
      </div>
    </div>
  );
};

export default ProfileSettingsAdmin;

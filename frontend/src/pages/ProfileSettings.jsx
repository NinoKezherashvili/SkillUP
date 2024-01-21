import React from "react";
import Sidebar from "./Sidebar";
import styles from "../styles/profilesettings.module.css";
import ProfileSettingsComponent from "./SecurityComponent";

const ProfileSettings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.content}>
        <ProfileSettingsComponent />
      </div>
    </div>
  );
};

export default ProfileSettings;

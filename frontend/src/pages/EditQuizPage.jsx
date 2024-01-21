import React from "react";
import Sidebar from "./Sidebar";
import styles from "../styles/profilesettings.module.css";
import EditQuizNew from "./EditQuizNew";

const EditQuizPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.content}>
        <EditQuizNew />
      </div>
    </div>
  );
};

export default EditQuizPage;

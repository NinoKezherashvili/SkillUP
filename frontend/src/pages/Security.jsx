import React from "react";
import Sidebar from "./Sidebar";
import styles from "../styles/security.module.css";
import SecurityComponent from "./SecurityComponent";

const Security = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.content}>
        <SecurityComponent />
      </div>
    </div>
  );
};

export default Security;

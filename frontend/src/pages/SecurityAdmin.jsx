import React from "react";
import Sidebar from "./Sidebar";
import styles from "../styles/security.module.css";
import SecurityComponentAdmin from "./SecurityComponentAdmin";

const SecurityAdmin= () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.content}>
        <SecurityComponentAdmin />
      </div>
    </div>
  );
};

export default SecurityAdmin;

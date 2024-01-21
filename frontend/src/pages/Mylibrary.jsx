import React from "react";
import Library from "./Library";
import styles from "../styles/mylibrary.module.css";
import Sidebar from "./Sidebar";
const Mylibrary = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Library />
        </div>
      </div>
    </>
  );
};

export default Mylibrary;

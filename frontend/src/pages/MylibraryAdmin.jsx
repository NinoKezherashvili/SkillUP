import React from "react";
import Library from "./Library";
import styles from "../styles/mylibrary.module.css";
import SidebarAdmin from "./SidebarAdmin";

const MylibraryAdmin = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SidebarAdmin />
        </div>
        <div className={styles.content}>
          <Library />
        </div>
      </div>
    </>
  );
};

export default MylibraryAdmin;

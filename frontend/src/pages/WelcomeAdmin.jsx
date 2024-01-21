import GetCategories from "./GetCategoriesAdmin";
import styles from "../styles/homepageadmin.module.css";
import SidebarAdmin from "./SidebarAdmin";

const WelcomeAdmin = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SidebarAdmin/>
        </div>
        <div className={styles.content}>
          <GetCategories />
        </div>
      </div>
    </>
  );
};
export default WelcomeAdmin;

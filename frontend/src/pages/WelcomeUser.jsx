import styles from "../styles/homepageuser.module.css";
import GetCategoriesUser from "./GetCategoriesUser";
import Sidebar from "./Sidebar";

const WelcomeUser = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <GetCategoriesUser />
        </div>
      </div>
    </>
  );
};

export default WelcomeUser;

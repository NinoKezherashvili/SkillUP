import styles from "../styles/sidebar.module.css";
import { useEffect, useState } from "react";
import avatar from "../images/avatar.svg";
import { Link, useNavigate } from "react-router-dom";
import security from "../images/Frame 7917.svg";
import person from "../images/Frame 7915.svg";
import arrow from "../images/arrow_forward_ios.svg";
import llogout from "../images/lgout.svg";
import thumbspin from "../images/Thumbpin.svg";
import terms from "../images/Frame 7916.svg";
import faq from "../images/Frame 7918.svg";
import logo from "../images/Logo.svg";
import axios from "axios";
import createquiz from "../images/createquiz.svg";
import library from "../images/mylibrary.svg";
import scores from "../images/scoreswhite.svg";

const Modal = ({ isOpen, onClose, categories, handleSave, showSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img
          src={thumbspin}
          alt="thumb spin"
          className={styles.thumbspin}
          onClick={onClose}
        />

        <ul>
          <li className={styles.linkNavigation}>
            <div>
              <img src={person} alt="person icon" />
              <Link to={"/profilesettingsadmin"} className={styles.linkModal}>
                Profile Settings
              </Link>
            </div>

            <img src={arrow} className={styles.arrow} alt="person icon" />
          </li>
          <li className={styles.linkNavigation}>
            <div>
              <img src={security} alt="terms and conditions" />
              <Link to={"/securityadmin"} className={styles.linkModal}>
                Security
              </Link>
            </div>

            <img src={arrow} className={styles.arrow} alt="person icon" />
          </li>
          <li className={styles.linkNavigation}>
            <div>
              <img src={terms} alt="change password" />
              <Link to={"/welcomeadmin"} className={styles.linkModal}>
                Terms and Conditions
              </Link>
            </div>

            <img src={arrow} className={styles.arrow} alt="person icon" />
          </li>
          <li className={styles.linkNavigation}>
            <div>
              <img src={faq} alt="person icon" />
              <Link to={"/welcomeadmin"} className={styles.linkModal}>
                FAQ
              </Link>
            </div>

            <img src={arrow} className={styles.arrow} alt="person icon" />
          </li>
        </ul>
      </div>
    </div>
  );
};

const SidebarAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const csrf = document.cookie;
  const csrfTokenValue = csrf.split("=")[1];

  console.log(csrfTokenValue);

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout/",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf,
          },
        }
      );

      console.log("Logout successful:", response.data);
    } catch (error) {
      console.error("Logout failed:", error.message, error.response);
    }
  };

  const clearCookies = () => {
    const cookieNames = ["sessionid", "csrftoken"];

    cookieNames.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    clearCookies();
    navigate("/");
    logout();
  };

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/profile/",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response);
        setUser(response.data.user);

        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  const navigatehomepage = () => {
    navigate("/welcomeadmin");
  };

  return (
    <div className={styles.quizCategoriesSidebar}>
      <div className={styles.right}>
        <div className={styles.left}>
          <button onClick={toggleModal} className={styles.sidebarbutton}>
            <img src={avatar} alt="avatar" style={{ cursor: "pointer" }} />
          </button>
          <button className={styles.logobutton} onClick={navigatehomepage}>
            <img src={logo} className={styles.sidebarlogo} alt="Logo" />
          </button>
          <h3>{user && user.full_name}</h3>
          <Modal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
        <span className={styles.navspan}>
          <div className={styles.sidebarNavigation}>
            <img src={createquiz} alt="create quiz" />
            <Link to={"/createquizadmin"} className={styles.link}>
              Create Quiz
            </Link>
          </div>
          <div className={styles.sidebarNavigation}>
            <img src={library} alt="create quiz" />
            <Link to={"/mylibraryadmin"} className={styles.link}>
              My Library
            </Link>
          </div>
          <div
            className={`${styles.sidebarNavigation} ${styles.marginBottom}  `}
          >
            <img src={scores} alt="user scores" />
            <Link to={"/scores"} className={styles.link}>
              Scores{" "}
            </Link>
          </div>

          <div className={`${styles.sidebarNavigation} ${styles.margintop}`}>
            <img src={llogout} alt="logout" />
            <button onClick={handleLogout} className={styles.logoutbutton}>
              Log Out
            </button>
          </div>
        </span>
      </div>
    </div>
  );
};

export default SidebarAdmin;

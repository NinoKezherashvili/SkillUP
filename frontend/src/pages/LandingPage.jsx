import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/landingpage.module.css";
import arrow from "../images/arrow_right_alt.svg";
import logo from "../images/Logo.svg";
import info from "../images/info.svg";
import homeimage from "../images/Group 39895.svg";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          X
        </span>
        <Link
          to="/login"
          className={`${styles.f20} ${styles.f200} ${styles.cWhite}   ${styles.login} `}
        >
          Log In
        </Link>
        <div className={styles.greenLine}></div>
        <p className={`${styles.f20} ${styles.f200} `}>
          Don't have an account?
        </p>
        <div className={styles.signupnavigation}>
          <Link
            to="/signup"
            className={`${styles.f20} ${styles.f200} ${styles.cBlack} ${styles.signup}`}
          >
            Sign up
          </Link>

          <Link
            to="/signup"
            className={`${styles.f20} ${styles.f200} ${styles.cBlack} ${styles.signup}`}
          >
            <img src={arrow} alt="arrow for sign upF" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <>
      <div className={styles.contentcontainer}>
        <div className={styles.aboutus}>
          <nav className={`${styles.dFlex} ${styles.navigation} `}>
            <div>
              <img src={logo} alt="Logo"  className={styles.homepagelogo}/>
            </div>
            <div className={`${styles.dFlex} ${styles.about}`}>
              <div>
                {" "}
                <img src={info} alt="About us" className={styles.info} />
                <Link
                  to="/"
                  className={`${styles.f15} ${styles.f200} ${styles.cWhite}`}
                >
                  About Us
                </Link>
              </div>
              <button
                to="/login"
                className={`${styles.f20} ${styles.f200}  ${styles.cWhite} ${styles.loginButton} `}
                onClick={toggleModal}
              >
                Login
              </button>
            </div>
          </nav>
        </div>
        <div className={styles.homecontent}>
          <div>
            <h1 className={styles.homepageheader}>Enjoy a perfect blend of <br/>education and entertainment</h1>
            <Link to="/signup" className={styles.homepagelink}>Get started</Link>
          </div>
          <div>
            <img src={homeimage} alt="" />
          </div>
        </div>
        <div className={styles.fig2}></div>
        <div className={styles.fig3}></div>
        <Modal isOpen={isModalOpen} onClose={toggleModal} />
      </div>
    </>
  );
};

export default LandingPage;

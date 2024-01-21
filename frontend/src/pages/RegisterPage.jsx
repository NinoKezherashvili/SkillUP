import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createData } from "../store/signup/createData.thunk";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/register.module.css";
import thumbpin from "../images/Thumbpin.png";
import axios from "axios";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  R E G U L A R      ------  E X P R E S S I O N S
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const fullNameRef = useRef(null);
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [course, setcourse] = useState(1);
  const [terms, setTerms] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  // const role = "user";

  useEffect(() => {
    const handleCourseData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/quiz/new_quiz_create",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setCoursesData(response.data.course);
        
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    handleCourseData();
  }, []);

  console.log(coursesData);
  //    C H E C K   ------    S T A T E

  const checkValues = () => {
    if (fullName.length < 8) {
      alert(` NEED MORE THEN 8 symbols`);
      return false;
    }
    if (!emailRegex.test(email)) {
      alert(`IS NOT VALID EMAIL `);
      return false;
    }
    if (!passwordRegex.test(passWord)) {
      alert(` AT LEAST 1, CAPITAL, 1 LOWER CASE , 1 speacial character `);

      return false;
    }
    if (passWord !== confirmPassword) {
      alert(` PASSWORDS DOESNT MATCH`);
      return false;
    }
    return true;
  };

  // H A N D L E -------  S U B M I T

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValues()) {
      dispatch(
        createData({
          full_name: fullName,
          email,
          password: passWord,
          course,
          accepted_to_terms: terms,
          username,
        })
      ).then((response) => {
        if (response && response.payload) {
          navigate("/welcomeuser");
        } else {
          console.error("Registration failed:", response.error);
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 id="register-h1" className={styles.bFont}>
          <img src={thumbpin} className={styles.thumbpin} alt="thumb pin" />
          Sign Up
        </h1>
        <input
          type="text"
          className={styles.authInput}
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          ref={fullNameRef}
        />
        <input
          type="text"
          className={styles.authInput}
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          className={styles.authInput}
          placeholder="Email  Adress"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.confirmpassword}>
          <input
            type="password"
            className={styles.authInputPassword}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className={styles.authInputPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <select
          onChange={(e) => setcourse(e.target.value)}
          className={styles.courseSelect}
          required
        >
          <option
            className={styles.selectPlaceholder}
            value=""
            disabled
            selected
          ></option>
          {coursesData &&
            coursesData.map((courseOption) => (
              <option key={courseOption.id} value={courseOption.id}>
                {courseOption.title}
              </option>
            ))}
        </select>
        <div className={styles.terms}>
          {" "}
          <input
            type="checkbox"
            checked={terms}
            id="acceptTermsCheckbox"
            onChange={() => setTerms(!terms)}
          />
          <label
            htmlFor="acceptTermsCheckbox"
            className={styles.acceptTermsLabel}
          >
            I accept the terms and conditions
          </label>
        </div>

        <button
          className={styles.authButton}
          disabled={!fullName || !passWord || !confirmPassword || !course}
        >
          Sign Up
        </button>
        <Link className={styles.navigateLogin} to={"/login"}>
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;

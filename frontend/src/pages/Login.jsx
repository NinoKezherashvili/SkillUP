import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../store/login/UserSlice";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import thumbpin from "../images/Thumbpin.png";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser({ email: email, password: pwd })).then((result) => {
      console.log(result);
      if (result && result.payload) {
        const userEmail = result.payload.data.email;

        if (userEmail !== "admin@gmail.com") {
          navigate("/welcomeuser"); // Navigate to welcomeuser page ჩასანაცვლებელია is staff-ით ბექი რომ მომაწვდის მერე
          console.log("successfully logged in as welcomeuser");
        } else if (userEmail === "admin@gmail.com") {
          navigate("/welcomeadmin"); // Navigate to welcomeadmin page
          console.log("successfully logged in as welcomeadmin");
        }
      } else {
        console.error("Invalid server response:", result);
      }
    });
  };

  const { loading, error } = useSelector((state) => state.user);
  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.bFont}>Log In</h1>
        <img src={thumbpin} className={styles.thumbpin} alt="thumb pin" />
        <input
          type="text"
          id="username"
          placeholder="Email address"
          value={email}
          onChange={handleUserInput}
          autoComplete="off"
          required
          className={styles.authInput}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlePwdInput}
          value={pwd}
          required
          className={styles.authInput}
        />

        <button type="submit" className={styles.authButton}>
          {loading ? "Loading..." : "Log In"}
        </button>
        {error && (
          <div style={{ color: "red", fontSize: "16px" }}> {error}</div>
        )}

        <Link to="/signup" className={styles.navigateLogin}>
          Don't have an account? &nbsp;&nbsp;{" "}
          <span>
            <b> Sign Up</b>
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Login;

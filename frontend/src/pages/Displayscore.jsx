import styles from "../styles/displayScore.module.css";

const DisplayScore = ({ maxScore, score, dashArray }) => {
  return (
    <div className={styles.userScoreContainer}>
      <div className={styles.skill}>
        <div className={styles.scoreOuter}>
          <div className={styles.inner}>
            <div className={styles.number}>
              {score}/{maxScore}
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="400px"
          height="400px"
        >
          <defs>
            <linearGradient
              id="GradientColor"
              x1="99%"
              y1="1%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#39D003" />
              <stop offset="100%" stopColor="#E01400" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="182"
            strokeLinecap="round"
            style={{ strokeDashoffset: 1125 - dashArray }}
          />
        </svg>
      </div>
    </div>
  );
};
export default DisplayScore;

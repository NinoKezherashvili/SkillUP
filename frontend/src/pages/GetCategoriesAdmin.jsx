import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/getcategoriesadmin.module.css";

function GetCategories() {
  const [categories, setCategories] = useState([]);
  // const role = "user";

  useEffect(() => {
    const handleCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/quiz/list/",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer xqV72-moMK_a_u_QJTHyybjqNfiMlQpZaoyCWPP_St1hs-a3Lw`,
            },
          }
        );

        const quizData = response.data;
        console.log(quizData);
        const groupedQuizzes = quizData.reduce((acc, quiz) => {
          const category = quiz.category;

          if (!acc[category]) {
            acc[category] = [];
          }
          const { ...quizInfo } = quiz;
          acc[category].push(quizInfo);

          return acc;
        }, {});

        setCategories(groupedQuizzes);
        console.log(groupedQuizzes);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    handleCategories();
  }, []);

  return (
    <div className={`${styles.dflex} ${styles.dcolumn}`}>
      {Object.entries(categories).map(([category, quizzes]) => (
        <div key={category} className={`${styles.dflex} ${styles.dcolumn}`}>
          <h2 className={styles.quizcategory}>{category}</h2>
          <div className={`${styles.dgrid}`}>
            {quizzes.map((quiz) => (
              <div key={quiz.id} className={styles.quiz}>
                <div className={styles.quizimage}></div>
                <div className={styles.quizdetails}>
                  <div>
                    <h3 className={styles.quizname}>{quiz.title}</h3>
                  </div>
                  <div className={styles.adminquiznavigation}>
                    <Link
                      className={styles.linkedit}
                      to={`/startquiz/${encodeURIComponent(quiz.title)}`}
                    >
                      Start Quiz
                    </Link>
                    <Link
                      className={styles.linkedit}
                      to={`/editquiz/${encodeURIComponent(quiz.title)}`}
                    >
                      Edit Quiz
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetCategories;

import axios from "axios";
import styles from "../styles/playquiz.module.css";
import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DisplayScore from "./Displayscore";
import logo from "../images/Logo.svg";

const PlayQuizTemplate = () => {
  const quizId = useParams();
  const quizName = quizId.uuid;
  const [isLoading, setIsLoading] = useState(true);
  const [questionsData, setQuestionsData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/quiz/start/${quizName}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const quizData = response.data;
        console.log(quizData);
        setQuestionsData(quizData);
        setQuestion(quizData[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error.message);
      }
    };

    handleData();
  }, []);

  // Display Questions
  // Display Questions
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(questionsData[0]);
  const [lock, setLock] = useState(false);
  // Display Users Score
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);

  // Show Correct Answwer in case of Incorrect
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const optionArray = [option1, option2, option3, option4];
  // Move to next question
  const moveToNext = () => {
    if (lock) {
      if (index === questionsData.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(questionsData[index]);
      setLock(false);
      optionArray.map((option) => {
        option.current.classList.remove(styles.correct);
        option.current.classList.remove(styles.inCorrect);
      });
    }
  };
  const checkAnswer = (e, answer) => {
    if (!lock) {
      question.answer.map((eachQuestion) => {
        if (eachQuestion.is_correct && answer) {
          console.log("TRUEEEEE");
          e.target.classList.add("correct");
          setScore((prev) => prev + 1);
          //   return;
        } else {
          console.log("hey");
          e.target.classList.add(styles.inCorrect);
          optionArray[
            question.answer.findIndex((a) => a.is_correct)
          ].current.classList.add(styles.correct);
        }
      });
      setLock(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (result) {
    console.log(result);
    return (
      <DisplayScore
        maxScore={questionsData.length}
        score={score}
        dashArray={(score / questionsData.length) * 1125}
      />
    );
  }

  return (
    <div className={styles.playQuizTemplateContainer}>
      <div className={styles.playQuizTemplateHeader}>
        <Link to="/welcomeuser">
          <img src={logo} alt="Logo" className={styles.logoquizcreate} />
        </Link>
        <p className={styles.user}>{user.full_name}</p>
      </div>
      {}
      <div className={styles.numberOfQuestion}>
        <p className={styles.questioncount}>
          {index + 1}/{questionsData.length}
        </p>
      </div>
      <div className={styles.questionContainer}>
        <p>{question.title}</p>
      </div>
      <div className={styles.answersContainer}>
        <p
          ref={option1}
          onClick={(e) => checkAnswer(e, question.answer[0].is_correct)}
          className={styles.first}
        >
          {question.answer[0].answer_text}
        </p>
        <p
          ref={option2}
          onClick={(e) => checkAnswer(e, question.answer[1].is_correct)}
          className={styles.second}
        >
          {question.answer[1].answer_text}
        </p>
        <p
          ref={option3}
          onClick={(e) => checkAnswer(e, question.answer[2].is_correct)}
          className={styles.third}
        >
          {question.answer[2].answer_text}
        </p>
        <p
          ref={option4}
          onClick={(e) => checkAnswer(e, question.answer[3].is_correct)}
          className={styles.fourth}
        >
          {question.answer[3].answer_text}
        </p>
      </div>
      <div className={styles.button}>
        <button onClick={() => moveToNext()}>Submit</button>
      </div>
    </div>
  );
};
export default PlayQuizTemplate;

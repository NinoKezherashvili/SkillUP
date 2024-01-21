import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/editquiznew.module.css";

const EditQuizNew = () => {
  const quizId = useParams();
  const quizName = quizId.uuid;
  const [quiz, setQuiz] = useState("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  
  //   const [updatedQuestion, setUpdatedQuestion] = {
  //     quiz: 0,
  //     technique: 1,
  //     title: "string",
  //     answer: [
  //       {
  //         id: 0,
  //         answer_text: "string",
  //         is_correct: true,
  //       },
  //     ],
  //   };


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
        setQuiz(quizData);
      } catch (error) {
        console.error("Error fetching quiz:", error.message);
      }
    };

    handleData();
  }, []);

  const handleEditButtonClick = (index) => {
    setSelectedQuestionIndex(index);
  };

  return (
    <div>
      <h1>Edit Quiz Answers</h1>
      {quiz &&
        quiz.map((question, index) => (
          <div key={index} className={styles.question}>
            <div className={styles.questiondetail}>
              {" "}
              <button
                className={styles.questionindex}
                onClick={() => handleEditButtonClick(index)}
              >
                {index + 1}
              </button>
              <p>{question.title}</p>
            </div>

            {selectedQuestionIndex === index ? (
              question.answer.map((answer, answerIndex) => (
                <input
                  className={styles.questioninput}
                  key={answerIndex}
                  type="text"
                  value={answer.answer_text}
                  //   onChange={(e) => setUpdatedQuestion()}
                />
              ))
            ) : (
              <p>Please choose question to edit</p>
            )}
            <button className={styles.changebutton}>
              Edit Question
            </button>
          </div>
        ))}
    </div>
  );
};

export default EditQuizNew;

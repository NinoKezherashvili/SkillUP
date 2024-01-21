import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/createquiz.module.css";
import { Link } from "react-router-dom";
import thumbpin from "../images/Thumbpin.png";
import logo from "../images/Logo.svg";

//Modal
const Modal = ({ isOpen, onClose, categories, setQuestions, questions }) => {
  //get Categories and Courses
  const createQuiz = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/quiz/test_quiz_create/",
        {
          creator: user.id,
          title: quizName,
          course: user.course,
          category: category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Quiz created successfully:", response.data);

      // Update the quiz property in the questions state
      const updatedQuestions = questions.map((question) => ({
        ...question,
        quiz: response.data.id,
      }));
      setQuestions(updatedQuestions);

      localStorage.setItem("quiz", JSON.stringify(response.data));
      onClose();
      return response;
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  //states
  const [quizName, setQuizName] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!isOpen) return null;

  //modal content
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.createquizmodal}>
          <span className={styles.closeButton} onClick={onClose}>
            <img src={thumbpin} alt="Thumb pin" className={styles.thumbpin} />
          </span>
          <div className={styles.quizDetails}>
            <label>Add New Quiz </label>
            <input
              type="text"
              placeholder="Untitled Quiz"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className={styles.quizNameInput}
            />
          </div>
          <div className={styles.categories}>
            {categories &&
              categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.category} ${
                    selectedCategory === category.id
                      ? styles.selectedCategory
                      : ""
                  }`}
                  onClick={(e) => {
                    setCategory(category.id);
                    setSelectedCategory(category.id);
                  }}
                >
                  {category.name}
                </button>
              ))}
          </div>
          <button onClick={createQuiz} className={styles.savequizbutton}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
//End of modal

const CreateQuizAltAdmin = () => {
  //states
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const [questions, setQuestions] = useState([
    {
      technique: 1,
      title: "",
      answer: [
        {
          answer_text: "",
          is_correct: false,
        },
        {
          answer_text: "",
          is_correct: false,
        },
        {
          answer_text: "",
          is_correct: false,
        },
        {
          answer_text: "",
          is_correct: false,
        },
      ],
    },
  ]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = async () => {
    await saveQuestion(currentQuestionIndex);
  };

  const saveQuestion = async (questionIndex) => {
    try {
      console.log(questionIndex);
      console.log(questions[questionIndex]);
      const response = await axios.post(
        "http://localhost:8000/api/quiz/new_question_create",
        questions[questionIndex],
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );
      console.log(
        `Question ${questionIndex + 1} saved successfully:`,
        response.data
      );
      setSuccessMessage("Question saved successfully!");
    } catch (error) {
      console.error(
        `Error saving question ${questionIndex + 1}:`,
        error.message
      );
    }
  };

  useEffect(() => {
    const handleCourseData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/quiz/new_quiz_create",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response);
        setCategories(response.data.category);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    handleCourseData();
    return () => {
      localStorage.removeItem("quiz");
    };
  }, []);

  const handleQuestionChange = (index, newText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].title = newText;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (answerIndex, newValue) => {
    console.log(answerIndex);
    console.log(newValue);
    console.log(selectedQuestionIndex);
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].answer[answerIndex].answer_text =
      newValue;
    setQuestions(updatedQuestions);
  };

  const handleRadioChange = (answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].answer[answerIndex].is_correct =
      !updatedQuestions[selectedQuestionIndex].answer[answerIndex].is_correct;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    console.log(currentQuestionIndex);
    const quizId = JSON.parse(localStorage.getItem("quiz"));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSuccessMessage("");
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        quiz: quizId.id,
        technique: 1,
        title: "",
        answer: [
          {
            answer_text: "",
            is_correct: false,
          },
          {
            answer_text: "",
            is_correct: false,
          },
          {
            answer_text: "",
            is_correct: false,
          },
          {
            answer_text: "",
            is_correct: false,
          },
        ],
      },
    ]);
    setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
  };

  //Quiz Form
  return (
    <>
      <nav className={styles.createquiznav}>
        <Link to="/welcomeadmin">
          <img src={logo} alt="Logo" className={styles.logoquizcreate} />
        </Link>
        <h2>Create Quiz</h2>
        <p>{user.full_name}</p>
      </nav>

      <div className={styles.createquiz}>
        <aside className={styles.settings}>
          {questions.map((_, index) => (
            <button
              key={index}
              className={styles.qButton}
              onClick={() => setSelectedQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleAddQuestion} className={styles.qButton}>
            +
          </button>
          <button className={styles.btnSaveQuiz} onClick={handleSave}>
            Save Question
          </button>
        </aside>

        <form className={styles.addQuiz}>
          <input
            type="text"
            className={styles.qInput}
            placeholder="question"
            value={questions[selectedQuestionIndex].title}
            onChange={(e) =>
              handleQuestionChange(selectedQuestionIndex, e.target.value)
            }
          />
          <div className={styles.answersInputs}>
            {questions[selectedQuestionIndex].answer.map(
              (answer, answerIndex) => (
                <div key={answerIndex} className={styles.answerFormat}>
                  <input
                    type="checkbox"
                    name="correctAnswer"
                    className={styles.answerRadio}
                    id={`checkbox${answerIndex}`}
                    checked={answer.is_correct}
                    onChange={() => handleRadioChange(answerIndex)}
                  />
                  <input
                    key={answerIndex}
                    className={`${styles[`Answer${answerIndex + 1}`]} ${
                      styles.aInput
                    }`}
                    type="text"
                    name=""
                    id=""
                    placeholder={`Answer ${answerIndex + 1}`}
                    value={answer.answer_text}
                    onChange={(e) =>
                      handleAnswerChange(answerIndex, e.target.value)
                    }
                  />

                  <label htmlFor={`radio${answerIndex}`}></label>
                </div>
              )
            )}
          </div>
          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={() => toggleModal()}
          categories={categories}
          setQuestions={setQuestions}
          questions={questions}
        />
      </div>
    </>
  );
};

export default CreateQuizAltAdmin;

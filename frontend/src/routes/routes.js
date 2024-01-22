import WelcomeAdmin from "../pages/WelcomeAdmin";
import WelcomeUser from "../pages/WelcomeUser";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
import GetCategories from "../pages/GetCategoriesAdmin";
import ProfileSettings from "../pages/ProfileSettings";
import Security from "../pages/Security";
import Login from "../pages/Login";
import CreateQuizAlt from "../pages/CreateQuizAlt";
import Mylibrary from "../pages/Mylibrary";
import MylibraryAdmin from "../pages/MylibraryAdmin";
import StartQuiz from "../pages/StartQuiz";
import EditQuizPage from "../pages/EditQuizPage";
import SecurityAdmin from "../pages/SecurityAdmin";
import ProfileSettingsAdmin from "../pages/ProfileSettingsAdmin";
import CreateQuizAltAdmin from "../pages/CreateQuizAltAdmin";
import Scores from "../pages/Scores";
import LoginAfterRegister from "../pages/LoginAfterRegister";

const routes = [
  {
    element: <WelcomeAdmin />,
    path: "/welcomeadmin",
  },
  {
    element: <WelcomeUser />,
    path: "/welcomeuser",
  },
  {
    element: <CreateQuizAlt />,
    path: "/createquiz",
  },

  {
    element: <CreateQuizAltAdmin />,
    path: "/createquizadmin",
  },
  {
    element: <Mylibrary />,
    path: "/mylibrary",
  },

  {
    element: <MylibraryAdmin />,
    path: "/mylibraryadmin",
  },

  {
    element: <RegisterPage />,
    path: "/signup",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <LoginAfterRegister />,
    path: "/loginafterregister",
  },

  
  {
    element: <GetCategories />,
    path: "/quizappgetcategories",
  },
  {
    element: <EditQuizPage />,
    path: "/editquiz/:uuid",
  },
  {
    element: <StartQuiz />,
    path: "/startquiz/:uuid",
  },
  {
    element: <ProfileSettings />,
    path: "/profilesettings",
  },

  {
    element: <ProfileSettingsAdmin />,
    path: "/profilesettingsadmin",
  },
  {
    element: <Security />,
    path: "/security",
  },
  {
    element: <SecurityAdmin />,
    path: "/securityadmin",
  },

  {
    element: <Scores />,
    path: "/scores",
  },

  { element: <LandingPage />, path: "/" },
];

export default routes;

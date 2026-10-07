import { useState, useEffect } from "react";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { api } from "../utils/api";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import NewCard from "./Main//ComponentsMain/NewCard/NewCard";
import EditProfile from "./Main//ComponentsMain/EditProfile/EditProfile";
import EditAvatar from "./Main//ComponentsMain/EditAvatar/EditAvatar";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Login from "./Auth/loguin/Login";
import Resgister from "./Auth/register/register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { auth } from "../utils/auth";
import InfoTooltip from "./Auth/infoToolTip/InfoTooltip";
import Popup from "./Main/ComponentsMain/popup/Popup";
import { setToken, getToken } from "../utils/token";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  // con esta variable verificamos si el usuario esta logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // add variable de estado card
  const [cards, setCards] = useState([]);
  /**popup */
  const [popup, setPopup] = useState(null);
  //popup de resgistro de usuario
  const [isInfoTooltip, setInfoTooltip] = useState(null);
  // uso de estado modal tooltip
  const [errorStatus, setErrorStatus] = useState(null);
  //user data para mostrar los datos del usaurio
  const [userData, setUserData] = useState({ email: "" });
  const location = useLocation();

  // registro del usuario
  const handleRegistration = ({ password, email }) => {
    auth
      .register(password, email)
      .then(() => {
        console.log("regsitro Completado");
        setInfoTooltip(true);
      })
      .catch((error) => {
        console.error(error);
        setErrorStatus({
          error: error.status,
          message: "uno de los campos se rellenó de forma incorrecta",
        });
        setInfoTooltip(false);
      });
  };

  //Inicio de session
  const handleLoguin = ({ password, email }) => {
    if (!password || !email) {
      setErrorStatus({
        error: "401",
        message:
          "no se ha encontrado al usuario con el correo electrónico especificado",
      });
      setInfoTooltip(false);
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        /*  console.log(data.token); */
        setToken(data.token);
        return auth.checkToken(data.token);
      })
      .then((userInfo) => {
        setErrorStatus(null);
        setUserData({ email: userInfo.data.email });
        setIsLoggedIn(true);
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      })
      .catch((err) => {
        setErrorStatus({
          error: err.status,
          message: "no se ha proporcionado uno o más campos",
        });
        setInfoTooltip(false);
        console.log(err);
      });
  };

  // usamos useeffect para comprobar que hay ub token vivo
  useEffect(() => {
    const jwt = getToken();
    //comporbamos el token
    if (!jwt) {
      return;
    }
    
    auth
    .checkToken(jwt)
    .then(({ data }) => {
        setIsLoggedIn(true);
        setUserData({ email: data.email });
        navigate("/")
      })
      .catch(console.error);
  }, []);

  //usamos useffect para obtener los datos del usuario
  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(` error user -> ${error}`);
      });
  }, []);

  // usamos useEffect para traer por primera vez a las cards
  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;
    try {
      // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
      const newCard = await api.changeLikeStatus(card._id, !isLiked);
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  }

  //elimina una card
  async function handleCardDelete(card) {
    const idCard = card._id;
    try {
      await api.deleteCard(idCard);
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== idCard),
      );
    } catch (error) {
      console.log(error);
    }
  }

  // esta funcion nos ayuda a actualizar el usuario
  const handleUpdateUser = async (data) => {
    try {
      const newData = await api.editUserInfo(data);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const newAvatar = await api.updateAvatar(data);
      setCurrentUser(newAvatar);
      handleClosePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    try {
      const newCard = await api.addCard(data);

      setCards(() => [newCard, ...cards]);
      handleClosePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const newCardPopup = {
    title: "Nuevo Lugar",
    children: <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} />,
  };
  const editProfile = { title: "Editar Perfil", children: <EditProfile /> };
  const editAvatr = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        isLoggedIn,
        setIsLoggedIn,
        userData,
      }}
    >
      <Header />
      <Routes>
        <Route
          path="/signin"
          element={
            <ProtectedRoute anonymous>
              <Login handleLoguin={handleLoguin} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute anonymous>
              <Resgister handleRegistration={handleRegistration} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Main
                onOpenPopup={handleOpenPopup}
                cards={cards}
                popup={popup}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onHandleClosePopup={handleClosePopup}
                editAvatr={editAvatr}
                editProfile={editProfile}
                newCardPopup={newCardPopup}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>

      {isInfoTooltip !== null && (
        <Popup
          onClose={() => {
            setInfoTooltip(null);
            if (isInfoTooltip === true) {
              navigate("/signin");
            }
          }}
        >
          <InfoTooltip success={isInfoTooltip} errorStatus={errorStatus} />
        </Popup>
      )}
      <Footer />
    </CurrentUserContext.Provider>
  );
}
/* navigate('/signin') */
export default App;

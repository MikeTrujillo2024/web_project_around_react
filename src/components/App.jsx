import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { api } from "../utils/api";

import NewCard from "./Main//ComponentsMain/NewCard/NewCard";
import EditProfile from "./Main//ComponentsMain/EditProfile/EditProfile";
import EditAvatar from "./Main//ComponentsMain/EditAvatar/EditAvatar";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  // add variable de estado card
  const [cards, setCards] = useState([]);
  /**popup */
  const [popup, setPopup] = useState(null);

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

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  //elimina una card
  async function handleCardDelete(card) {
    const idCard = card._id;

    await api
      .deleteCard(idCard)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== idCard),
        );
      })
      .catch((error) => console.log(error));
  }

  // esta funcion nos ayuda a actualizar el usuario
  const handleUpdateUser = (data) => {
    (async () => {
      await api.editUserInfo(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.updateAvatar(data).then((newAvatar) => {
        setCurrentUser(newAvatar);
        handleClosePopup();
      });
    })();
  };

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api
        .addCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          handleClosePopup();
        })
        .catch((error) => console.log(error));
    })();
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
      }}
    >
      <>
        <Header />

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

        <Footer />
        
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;

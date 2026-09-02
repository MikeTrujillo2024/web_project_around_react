import { useState, useContext } from "react";
import Popup from "./ComponentsMain/popup/Popup";
import Card from "./ComponentsMain/Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  onOpenPopup,
  cards,
  popup,
  onCardLike,
  onCardDelete,
  onHandleClosePopup,
  editAvatr,
  editProfile,
  newCardPopup,
}) {
  /**
   * este contiene la informacion del usuario que esta logueado
   * este se pasa desde contexto, este nos ayuda a pasar la informacion
   * desde cualquier parte del proyecto, sin necesidad de pasar por props
   */
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="content profile">
          <img
            src={currentUser.avatar}
            alt="image property of session"
            className="profile__image"
          />
          <div
            className="profile__image profile__image-edit"
            onClick={() => onOpenPopup(editAvatr)}
          ></div>
          <div className="profile__info">
            <p className="profile__name">{currentUser.name}</p>
            <button
              type="button"
              className="profile__info profile__info_edit_button"
              onClick={() => onOpenPopup(editProfile)}
            ></button>
            <span className="profile__info profile__about">
              {currentUser.about}
            </span>
          </div>
          <button
            type="button"
            className="profile__inf profile__info-button-add"
            onClick={() => onOpenPopup(newCardPopup)}
          >
            +
          </button>
        </section>
        <section className="place" id="place">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
      {popup && (
        <Popup onClose={onHandleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </>
  );
}

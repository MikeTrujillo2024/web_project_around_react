import { useState, useRef } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const nameImage = useRef();
  const urlImage = useRef();
  const [loading, setLoading] = useState("Guardar");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading("Enviando...");
    onAddPlaceSubmit({
      titulo: nameImage.current.value,
      url: urlImage.current.value,
    });
  }
  return (
    <form
      className="popup__container_form"
      id="popup__container-addCard"
      onSubmit={handleSubmit}
      
      noValidate
    >
      <input
        className="popup__input popup__content-name"
        type="text"
        name="titulo"
        placeholder="Titulo"
        id="popup__input_name"
        minLength="2"
        maxLength="30"
        ref={nameImage}
        required
      />
      <span className="popup__input popup__input_name-error "></span>
      <input
        className="popup__input popup__content-about"
        type="url"
        name="url"
        placeholder="Enlace a la imagen"
        id="popup__input_link"
        ref={urlImage}
        required
      />
      <span className="popup__input popup__input_link-error"></span>
      <button type="submit" className="popup__content-save" id="create">
        {loading}
      </button>
    </form>
  );
}

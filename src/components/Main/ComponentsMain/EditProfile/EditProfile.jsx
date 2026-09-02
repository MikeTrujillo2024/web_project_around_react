import { useContext, useState } from "react";
import CurrentUserContext from "../../../../context/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //evita el comportamiento predeterminado del navegador
    handleUpdateUser({ name, about: description });
  };
  return (
    <form
      className="popup__container_form"
      name="profile-form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* <fieldset className="popup__content"> */}
      <input
        className="popup__input popup__content-name"
        type="text"
        name="name__user"
        placeholder="Nombre"
        id="popup__input_name_Editar"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input popup__input_name_Editar-error"></span>
      <input
        className="popup__input popup__content-about"
        type="text"
        name="about"
        placeholder="Acerca de mi"
        id="popup__input_about"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__input popup__input_about-error"></span>
      <button
        type="submit"
        id="idpopup__content-save"
        className="popup__content-save"
      >
        Guardar
      </button>
      {/* </fieldset> */}
    </form>
  );
}

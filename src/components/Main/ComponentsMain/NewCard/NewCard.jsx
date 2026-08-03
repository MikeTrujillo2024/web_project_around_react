export default function NewCard() {
  return (
    <form
      className="popup__container_form"
      id="popup__container-addCard"
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
        required
      />
      <span className="popup__input popup__input_name-error "></span>
      <input
        className="popup__input popup__content-about"
        type="url"
        name="url"
        placeholder="Enlace a la imagen"
        id="popup__input_link"
        required
      />
      <span className="popup__input popup__input_link-error"></span>
      <button type="submit" className="popup__content-save" id="create">
        Guardar
      </button>
    </form>
  );
}

export default function EditPerfil() {
  return (
    <form className="popup__container_form" noValidate>
      {/* <fieldset className="popup__content"> */}
        <input
          className="popup__input popup__content-name"
          type="text"
          name="name__user"
          placeholder="Nombre"
          id="popup__input_name_Editar"
          minLength="2"
          maxLength="40"
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

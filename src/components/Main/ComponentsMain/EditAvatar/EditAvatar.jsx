import { useContext, useRef } from "react";
import onUpdateAvatar from "../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const editAvatar = useRef();
  const { handleUpdateAvatar } = useContext(onUpdateAvatar);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({avatar: editAvatar.current.value});
  }
  return (
    <form 
    className="popup__container_form"
    onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__content-name"
        ref={editAvatar}
        type="url"
        name="url__avatar"
        placeholder="url imagen"
        id="popup__input_avatar_Editar"
        required
      />
      <span className="popup__input popup__input_avatar_Editar-error"></span>
      <button
        type="submit"
        id="idpopup__content-saveAvatar"
        className="popup__content-save popup__content-saveAvatar"
      >
        Guardar
      </button>
    </form>
  );
}

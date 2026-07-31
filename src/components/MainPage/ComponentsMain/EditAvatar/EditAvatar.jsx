export default function EditAvatar(){
    return(
       <form className="popup__container_form">
            <input className="popup__input popup__content-name" type="url" name="url__avatar" placeholder="url imagen"
              id="popup__input_avatar_Editar" required />
            <span className="popup__input popup__input_avatar_Editar-error"></span>
            <button type="submit" id="idpopup__content-saveAvatar"
              className="popup__content-save popup__content-saveAvatar">Guardar</button>
        </form> 
    );
}
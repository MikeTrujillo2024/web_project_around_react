export default function Popup(props) {
  const { onClose, title, children } = props; // componentes que usara en los popup

  return (
    <div className="popup popup_opened" id="popup-places">
      <div className="popup__wrap">
        <button
          className="popup__button-cancel"
          id="popup__button-cancelForm"
          onClick={onClose}
        >
          +
        </button>
        <div className="popup__container">
          <fieldset className="popup__content" id="FormCard">
            {title && <h3 className="popup__content-title">{title}</h3>}            
            {children}
          </fieldset>
        </div>
      </div>
    </div>
  );
}

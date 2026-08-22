import ImagePopup from "../ImagePopup/ImagePopup";

export default function Card(props) {
  /**
   * Actualmente, tenemos datos ficticios para las tarjetas, que incluyen el
   * name , link y likescomo datos dinámicos.
   * Vamos a desestructurarlo desde las props y a utilizarlo en los lugares correctos.
   */
  const { card, handleOpenPopup } = props;
  const { name, link, isLiked } = card;
  const imageComponent = { children: <ImagePopup card={card} /> };

// Verifica si el usuario actual le ha dado "like" a la tarjeta
const cardLikeButtonClassName = `card__like-button ${
  isLiked ? 'place_card_content_like--active' : ''
}`;

/* console.log(cardLikeButtonClassName) */
  return (
    <div className="place__card">
      <button type="button" className="place__card_trash"></button>
      <img
        src={link}
        alt="image card place"
        className="place__card place__card_image"
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <div className="place__card place__card_content">
        <p className="place__card place__card_content_text">{name}</p>
        <button
          type="button"
          className={`place__card place__card_content_like ${cardLikeButtonClassName}`}
        ></button>
      </div>
    </div>
  );
}

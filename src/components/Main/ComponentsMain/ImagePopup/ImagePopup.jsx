export default function ImagePopup({card}) {
 
  return (
    <>
      <img className="popup__img" src={card.link} alt="Empty Image" />
      <h2 className="popup__img-title">{card.name}</h2>
    </>
  );
}

import { useState } from "react";
import Popup from "./ComponentsMain/popup/Popup";
import avatar from "../../images/cara.jpg";
import NewCard from "./ComponentsMain/NewCard/NewCard";
import EditProfile from "./ComponentsMain/EditProfile/EditProfile";
import EditAvatar from "./ComponentsMain/EditAvatar/EditAvatar";
import Card from "./ComponentsMain/Card/Card";

/**creamos una constante para hacer un array  ficticio */
const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];


export default function Main() {
  /**popup */
  const [popup, setPopup] = useState(null);

  const newCardPopup = {title:"Nuevo Lugar", children:<NewCard />}
  const editProfile = {title:"Editar Perfil", children:<EditProfile />}
  const editAvatr = {title:"Cambiar foto de perfil", children:<EditAvatar />}
  



  function handleOpenPopup(popup){
    setPopup(popup);

  }

  function handleClosePopup(){
    setPopup(null);
  }
  
  return (
    <>
    <main className="content">
      <section className="content profile">
        <img
          src={avatar}
          alt="image property of session"
          className="profile__image"
        />
        <div className="profile__image profile__image-edit" onClick={()=>handleOpenPopup(editAvatr)}></div>
        <div className="profile__info">
          <p className="profile__name">Mike Trujillo</p>
          <button
            type="button"
            className="profile__info profile__info_edit_button"
            onClick={()=>handleOpenPopup(editProfile)}
          ></button>
          <span className="profile__info profile__about">Desarrollador</span>
        </div>
        <button type="button" className="profile__inf profile__info-button-add" onClick={()=>handleOpenPopup(newCardPopup)}>
          +
        </button>
      </section>
      <section className="place" id="place">
        {
          cards.map((card)=>(
            <Card key={card._id} card={card} handleOpenPopup={handleOpenPopup}/>
          ))
        }
      </section>
    </main>
      {
        popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )
      }
      </>
  );
}

import avatar from "../../images/cara.jpg";
export default function MainPage() {
  return (
    <main className="content">
      <section className="content profile">
        <img
          src={avatar}
          alt="image property of session"
          className="profile__image"
        />
        <div className="profile__image profile__image-edit"></div>
        <div className="profile__info">
          <p className="profile__name"></p>
          <button
            type="button"
            className="profile__info profile__info_edit_button"
          ></button>
          <span className="profile__info profile__about"></span>
        </div>
        <button type="button" className="profile__inf profile__info-button-add">
          +
        </button>
      </section>
      <section className="place" id="place"></section>
    </main>
  );
}

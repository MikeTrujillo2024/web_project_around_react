import { useState } from 'react'
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import logo from './images/homeLogo.png';
import avatar from './images/cara.jpg';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="page">
      <header className="header">
        <img src={logo} alt="imagen homeLogo" className="header__logo" />
      </header>
      <main className="content">
      <section className="content profile">
        <img src={avatar} alt="image property of session" className="profile__image" />
        <div className="profile__image profile__image-edit"></div>
        <div className="profile__info">
          <p className="profile__name"></p>
          <button type="button" className="profile__info profile__info_edit_button"></button>
          <span className="profile__info profile__about"></span>
        </div>
        <button type="button" className="profile__inf profile__info-button-add">
          +
        </button>
      </section>
      <section className="place" id="place"></section>
    </main>
        <footer className="footer">
      <p>@ 2025 Around The U.S.</p>
    </footer>
    </div>
  )
}

export default App

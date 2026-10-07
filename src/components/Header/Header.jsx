import { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import currentUserContext from "../../contexts/CurrentUserContext";
import logo from "../../images/homeLogo.png";
import { removeToken } from "../../utils/token";
export default function Header() {
  const { isLoggedIn, setIsLoggedIn, userData } =
    useContext(currentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  function signOut() {
    removeToken();
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    <header className="header">
      <div className="header__img">
        <img src={logo} alt="imagen homeLogo" className="header__logo" />
      </div>
      <div className="header__status">
        {isLoggedIn && (
          <>
            <span className="headerStatus__Email">{userData.email}</span>
            <button className="headerStatus__session" onClick={signOut}>
              Cerrar Sesion
            </button>
          </>
        )}

        {!isLoggedIn && location.pathname === "/signin" && (
          <Link to="/signup" className="headerStatus__Email">Registrarse</Link>
        )}

        {!isLoggedIn && location.pathname === "/signup" && (
          <Link to="/signin" className="headerStatus__Email">Iniciar sesión</Link>
        )}
      </div>
    </header>
  );
}

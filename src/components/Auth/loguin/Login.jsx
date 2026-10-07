import { Link } from "react-router-dom";
import { useState } from "react";
export default function Login({handleLoguin}) {
  const [data, setData] = useState({ password:"", email: ""});

    // Obtenemos el nombre y el valor del input que generó el evento y los guardamos en variables.
 //{ name, value } = e.target;
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setData((prevData) =>({...prevData, [name]: value}));
   };

    const handleSubmit = (e) =>{
    e.preventDefault();
    handleLoguin(data)
   }
  return (
    <div className="login__container">
      <form action="" className="login__form" onSubmit={handleSubmit}>
        <h1 className="form__title">Inicia sesión</h1>
        <div className="form__inputs">
          <input
            type="email"
            name="email"
            id="idEmail"
            value={data.email}
            onChange={handleChange}
            className="inputs__input"
            placeholder="Correo Electrónico"
          />
          <input
            type="password"
            name="password"
            id="idContrasena"
            value={data.password}
            onChange={handleChange}
            className="inputs__input"
            placeholder="Contraseña"
          />
        </div>
        <div className="form__submit">
          <input type="submit" value="Inicia sesión" className="submit__boton" />
          <span className="submit__span">¿Ya eres miembro? <Link to="/signup">Registrate aquí</Link></span>
        </div>
      </form>
    </div>
  );
}

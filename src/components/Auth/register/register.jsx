import { useState } from "react";
import { Link } from "react-router-dom";


export default function Register({handleRegistration}) {
  // desestructuramos handle registration
  // inicializamos con los datos vacios
  const [data, setData] = useState({email: "", password: ""});

  // Obtenemos el nombre y el valor del input que generó el evento y los guardamos en variables.
 //{ name, value } = e.target;
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setData((prevData) =>({...prevData, [name]: value}));
   };

   const handleSubmit = (e) =>{
    e.preventDefault();
    handleRegistration(data)
   }
  return (
    <div className="register__container">
      <form action="" className="register__form" onSubmit={handleSubmit}>
        <h1 className="form__title">Regístrate</h1>
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
          {/* <input type="submit" value="Regístrate" className="submit__boton" /> */}
           <button type="submit" className="submit__boton">
            Regístrate
          </button>
          <span className="submit__span">¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link></span>
        </div>
      </form>
    </div>
  );
}

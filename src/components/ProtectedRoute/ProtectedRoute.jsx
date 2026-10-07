import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import currentUserContext  from "../../contexts/CurrentUserContext"
/**
 *
 * ## @param {boolean} isLoggedIn - este contiene el valor si el usuario inicio session o no
 * @param {React.ReactNode} props.children - este recibe un componente
 * @param {boolena} anonymous -- esta propiedad se utilizara para indicar las rutas que se pueden
 * visitar de forma anonima (es decir sin autorizacion ).
 * @returns {React.ReactNode} retorna el componente que estamos pasando por children
 */
function ProtectedRoute({ children,anonymous = false }) {
  //invoca el hook uselocation y accede al valor de la porpiedad from
  // de su objeto state, si no existe la propiedad from se utilizara
  // por defecto "/"
const location = useLocation();
const from = location.state?.from || "/";  
const { isLoggedIn } = useContext(currentUserContext)
  
// si el usuario ha iniciado sesion de redirigimos fuera de 
// nuestars rutas anonimas
if(anonymous && isLoggedIn){
  return <Navigate to="/" replace />;
}
if (!anonymous && !isLoggedIn) {
  // si el usuario no ha iniciado sesion se redireccionara al componenete
    //para que pueda loguearse
    return <Navigate to="/signin" state={{from: location}} />;
  }
  // si el usuario ya esta con session inciada se direccionara para el componente
  //que estemos mandando por children
  return children;
}

export default ProtectedRoute;
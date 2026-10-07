/**
 * Crear funciones auxiliares
 * Estas funciones nos permitirán interactuar 
 * con el almacenamiento local de una forma 
 * un poco más sencilla y evitará que se duplique el código.
 */
const TOKEN_KEY = "jwt";

// setToken acepta el token como argumento y lo agrega a
//localstorage con la clave TOKEN_KEY

export const setToken = (token) =>
    localStorage.setItem(TOKEN_KEY, token);


//getToken recupera y sevuelve el valor asociado a 
//TOKEN_KEY desde localstorage
export const getToken = () =>{
    return localStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// terminamos este token se debe importar a app.jsx y actualiza el 
//inicio se sesion para guardar el token en el almacenamiento local
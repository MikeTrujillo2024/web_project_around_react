
export default class Auth {
    /**
     * 
     * @param {*} baseUrl -- url del api backend
     * @param {*} headers -- cabeceras que se necesitan
     */
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers
    }

    /**
     * 
     *verifica que la respuesta del api sea correcta si
     *no es ok manda el error
     */
    async _checkRes(res) {
        if (res.ok) {
            return res.json();
        }

        /* return Promise.reject(`Error: ${res.status}`); */
         const error = await res.json();

  return Promise.reject({
    status: res.status,
    ...error,
    });
    }

    /**
     * 
     * @param {String} password -- contrasena del nuevo usuario
     * @param {String} email  -- correo del nuevo usuario
     * @returns 
     */
    register(password, email) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password,
                email
            }),
        }).then((res) => this._checkRes(res));
    }

    authorize(email,password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password,
                email
            }),
        }).then((res) => this._checkRes(res));

    }

    checkToken = (token) =>{
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers:{
                ...this._headers,
               "Authorization" : `Bearer ${token}`
            },
        }).then((res)=>this._checkRes(res));
    }
}

export const auth = new Auth("https://se-register-api.en.tripleten-services.com/v1",
    { Accept: "application/json", "Content-Type": "application/json" }
)
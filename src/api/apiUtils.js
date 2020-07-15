let urlBase = "http://localhost:8000/api/";
let jwt = {};
let tokenName = "token";

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 400) {
      // So, a server-side validation error occurred.
      // Server side validation returns a string error message, so parse as text instead of json.
      const error = await response.text();
      throw new Error(error);
    }
    throw new Error("Network response was not ok.");
  }
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

export function getToken() {
  if (!sessionStorage.getItem(tokenName)) {
    return false;
  } else {
    return JSON.parse(sessionStorage.getItem(tokenName));
  }
}

export function login(email, password) {
  let data = { email, password };

  return verificarLogin(data);
}

async function verificarLogin(data) {
  let rdo = false;

  try {
    rdo = await traerUsuario(data);
    console.log("trajo el resultado");
    return rdo;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function traerUsuario(data) {
  let url = urlBase + "login";
  let jwt = {};

  let miInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    body: JSON.stringify(data),
  };

  console.log("arranco el fetch del login:", url);

  try {
    let rta = await fetch(url, miInit)
      .then((response) => response.json())
      .then((data) => data)
      .catch(function (error) {
        console.log("error en el fetch", error.message);
        return error;
      });

    console.log("rta del fetch", rta);
    if (rta.rta) {
      let _usuario = {};
      _usuario.nombre = rta.payload.nombre;
      _usuario.apellido = rta.payload.apellido;
      _usuario.id = rta.payload.id;
      _usuario.email = rta.payload.email;
      _usuario.jwt = rta.jwt;

      sessionStorage.setItem(tokenName, JSON.stringify(_usuario));
    } else {
      jwt.value = "error en las credenciales";
    }

    return rta.rta;
  } catch (error) {
    console.log(error);
    return false;
  }
}

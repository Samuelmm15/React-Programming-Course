import { useEffect, useState } from "react";
import { baseUrl } from "../shared";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();
    // Hacemos uso de la API de Django para poder realizar la autenticación de los usuarios
    // Hay que tener en cuenta que en dicha ruta que hemos configurado abajo, no se hace uso de api/login, ya que en el
    // backend lo hemos configurado como api/token
    const url = baseUrl + "api/token/";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        console.log(localStorage);
      });
  }

  return (
    <form className="m-2 w-full max-w-sm" id="customer" onSubmit={login}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="Username">Username</label>
        </div>
        <div className="md:w-3/4">
          <input
            id="Username"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="Password">Password</label>
        </div>
        <div className="md:w-3/4">
          <input
            id="Password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
    </form>
  );
}

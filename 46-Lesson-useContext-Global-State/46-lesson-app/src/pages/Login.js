import { useEffect, useState } from "react";
import { baseUrl } from "../shared";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.state);
  });

  function login(e) {
    e.preventDefault();
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
        /**
         * Debido a que puede ocurrir que cuando estamos en la página de login y queremos que tras realizar el login
         * vuelva a la página que estabamos, si no estabamos de manera previa en una página que pertnezca a la aplicación
         * nos dará un error si no realizamos la implementación de un operador ternario que nos permita comprobar y tener
         * en cuenta este error, permitiendonos determinar por tanto solucionar aquellos posibles errores que se puedan generar.
         * 
         * Cabe destacar que hacemos uso de las ?, para poder comprobar y determinar que dicha variable puede llegar a ser nula.
         */
        navigate(location?.state?.previousUrl ? location.state.previousUrl: "/customers");
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

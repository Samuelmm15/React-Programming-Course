import "./index.css";
import { createContext, useState, useEffect } from "react";
import Headers from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Definition from "./pages/Definition";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { baseUrl } from "./shared";

export const LoginContext = createContext();

function App() {
  // NOTA: Se realiza la creación de un usEffect que nos permite realizar el refresh del token cada 5 minutos, en vez de hacer
  // uso de un bucle se establece un tiempo mediante la operación setInterval que nos permite establecer que cada 5 minutos
  // se acceda a la ruta especificada abajo, permitiendo que se obtenga el token de nuevo más tarde
  useEffect(() => {
    function refreshTokens() {
      if (localStorage.refresh) {
        const url = baseUrl + "api/token/refresh/";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          });
      }
    }
    const minute = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minute * 3);
  }, []);

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  // Realizamos la creación de una función que nos permita realizar la acción de mejor manera
  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    // Its important to establish the option value.
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Headers>
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Headers>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;

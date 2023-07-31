import "./index.css";
import { createContext, useState } from "react";
import Headers from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Definition from "./pages/Definition";
import Customer from "./pages/Customer";
import Login from "./pages/Login";

export const LoginContext = createContext();

function App() {
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
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Headers>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;

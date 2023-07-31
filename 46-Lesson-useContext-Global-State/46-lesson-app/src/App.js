import "./index.css";
// First we need to import the library that we are going to use to create the context
import { createContext, useState } from 'react';
import Headers from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Definition from "./pages/Definition";
import Customer from "./pages/Customer";
import Login from "./pages/Login";

// Second we need to create the context and put it a name
export const LoginContext = createContext();

function App() {
  // To use the value option of the context, its neccesary to create a state to use it
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    // Its important to establish the option value.
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
    <BrowserRouter>
      <Headers>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/dictionary/:search" element={<Definition />} />
          <Route path="/customers" element={<Customers />} />
          {/* Hay que tener en cuenta que esta es la nueva ruta que se va a añadir para el episodio 32
          ya que, se va a mostrar la información detallada de un usuario en una página nueva que viene dada
          por la identificación de cada uno de los objetos que se encuentran dentro del backend */}
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


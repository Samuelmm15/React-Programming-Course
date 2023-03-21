import "./index.css";
import Headers from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Dictionary from "./components/Dictionary";
// Esto de aquí son los componentes que se van a usar en la aplicación,
// en este caso se va a usar el componente Header y el componente Employees,
// el componente Header es el que va a contener las rutas de la aplicación,
// y el componente Employees es el que va a contener la lista de empleados.
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // Hay que tener en cuenta que no se puede cerrar el header con un <Header />, ya que este componente se
    // va a usar como un contendor de páginas para este caso
    <BrowserRouter>
      <Headers>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </Headers>
    </BrowserRouter>
  );
}

export default App;

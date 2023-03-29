import "./index.css";
import Headers from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import NotFound from "./components/NotFound";
// Esto de aquí son los componentes que se van a usar en la aplicación,
// en este caso se va a usar el componente Header y el componente Employees,
// el componente Header es el que va a contener las rutas de la aplicación,
// y el componente Employees es el que va a contener la lista de empleados.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Definition from "./pages/Definition";

function App() {
  return (
    // Hay que tener en cuenta que no se puede cerrar el header con un <Header />, ya que este componente se
    // va a usar como un contendor de páginas para este caso
    <BrowserRouter>
      <Headers>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/dictionary" element={<Dictionary />} />
          {/* Hay que tener en cuenta que lo que se tiene abajo :search, hace
          referencia al empleo de parametros o variables dentro de las rutas de
          busqueda que, para ente caso se emplea como un elemento para comprobar en nuesta API de diccionario*/}
          <Route path="/definition/:search" element={<Definition />} />
          <Route path="/customers" element={<Customers />} />
          {/* Hay que tener en cuenta que el componente NotFound, es el que se va a usar para
          mostrar la pagina de error 404, y para que esto funcione, se debe de hacer la
          configuracion de la ruta de la pagina de error 404 */}
          <Route path="/404" element={<NotFound />} />
          {/* Esta ruta que se puede observar a continuacion es la ruta por defecto, y,
          se usa para poder establecer cual es la pagina que por defecto te va a mostrar tu sitio
          web, en el caso de que se produzca algun fallo */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Headers>
    </BrowserRouter>
  );
}

export default App;


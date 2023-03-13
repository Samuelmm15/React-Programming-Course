import "./index.css";
import Headers from "./components/Header";
import Employees from "./pages/Employees"; 

function App() {
  return (
    // Hay que tener en cuenta que no se puede cerrar el header con un <Header />, ya que este componente se
    // va a usar como un contendor de páginas para este caso
    <Headers>
      <Employees />
    </Headers>
  );
}

export default App;

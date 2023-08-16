import DefinitionSearch from "../components/DefinitionSearch";

export default function Dictionary() {
  return (
    // Haciendo uso del div, nos permite establecer, este tipo de 
    // comportamiento, para que el componente de busqueda, se encuentre centrado
    // en la pagina, si no usaramos el div, se quedará con el comportamiento por defecto
    // que es que se encuentre alineado a la izquierda
    <div className="flex justify-center">
      <DefinitionSearch />
    </div>
  );
}

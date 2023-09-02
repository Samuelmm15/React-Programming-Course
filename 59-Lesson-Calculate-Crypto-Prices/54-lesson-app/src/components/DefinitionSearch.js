import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DefinitionSearch() {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("State changed, new word: " + word);
  }, [word]);

  return (
    // Hay que tener en cuenta que para este caso se hace uso de form en la barra de busqueda
    // para que cuando se pulse la tecla de enter, se pueda hacer la busqueda de la palabra, y que no solo se pueda hacer uso haciendo click en el boton de buscar
    <form
      className="flex space-between space-x-2 max-w-[300px]"
      onSubmit={() => {
        navigate("/dictionary/" + word);
      }}
    >
      <input
        className="shrink min-w-0 py-1 px-2 rounded"
        placeholder="Search for a word"
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button className="block mx-auto m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">Search</button>
    </form>
  );
}
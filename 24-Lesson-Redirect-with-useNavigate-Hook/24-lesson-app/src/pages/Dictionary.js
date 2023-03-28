import { useState, useEffect } from "react";
// Haciendo uso de useNavigate, se puede hacer uso de la redirección de rutas
// es decir, esto nos permite ir de una pagina a otra o de una ruta a otra que nosotros queramos o especifiquemos
import { useNavigate } from "react-router-dom";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("State changed, new word: " + word);
  }, [word]);

  return (
    <>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button
        onClick={() => {
          // Como se puede observa a continuacion, haciendo uso del useNavigate,
          // se puede especificar la ruta a la que queremos ir, ademas de poder especificar]
          // mediante la palabra introducida en el input, la palabra que queremos buscar en la API
          navigate('/definition/' + word);
        }}
      >
        Search
      </button>
    </>
  );
}

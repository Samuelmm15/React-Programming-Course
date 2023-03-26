import { useState, useEffect } from "react";

export default function Definition() {
  const [word, setWord] = useState("");
  // Hay que tener en cuenta que siempre siempre siempre, la estructura general de un useEffect es de la sigueinte manera:
  // useEffect(() => {}, [dependencias]);
  // ESTO QUE SE PUEDE VER A CONTINUACIÓN NOS PERMITE ESTABLECER EL FETCH DE LA API DE DICCIONARIO, PARA ELLO SE EMPLEA EL USO DEL FETCH DE LA MANERA
  // QUE SE PUEDE VER A CONTINUACIÓN
  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return <p>Here is a definition</p>;
}

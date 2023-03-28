import { useState, useEffect } from "react";

export default function Definition() {
  const [word, setWord] = useState();
  // Hay que tener en cuenta que siempre siempre siempre, la estructura general de un useEffect es de la sigueinte manera:
  // useEffect(() => {}, [dependencias]);
  // ESTO QUE SE PUEDE VER A CONTINUACIÓN NOS PERMITE ESTABLECER EL FETCH DE LA API DE DICCIONARIO, PARA ELLO SE EMPLEA EL USO DEL FETCH DE LA MANERA
  // QUE SE PUEDE VER A CONTINUACIÓN
  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/helicopter")
      .then((response) => response.json())
      .then((data) => {
        setWord(data);
        console.log(data[0].meanings);
      });
  }, []);

  return (
    <>
      <h1>Here is a definition:</h1>
      {/* HAY QUE TENER EN CUENTA QUE SE GENERA UN ERROR SI HACEMOS USO DEL MAP, POR ALGUN MOTIVO, POR TANTO, 
      SE DEBE DE USAR DE LA MANERA EN LA QUE FUE REALIZADA EN LA PARTE DE ABAJO */}
      {/* {word.map((item) => {
        return (
          <>
            <h2>{item && item.word}</h2>
            <p>{item && item.meanings[0].definitions[0].definition}</p>
          </>
        );
      })} */}

      {/* Cabe destacar que para poder entender el funcionamiento de los .json usados por la api gratis,
      debemos de ir a la pagina de free dictionary api para entender el funcionamiento usado a continuacion */}
      <h2 className="font-bold">{word && word[0].word}</h2>
      <p>{word && word[0].phonetics[0].text}</p>
      <p className="font-bold">{word && word[0].meanings[0].partOfSpeech}</p>
      <p>{word && word[0].meanings[0].definitions[0].definition}</p>
    </>
  );
}

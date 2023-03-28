import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Definition() {
  const [word, setWord] = useState();
  let { search } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search)
      // De esta manera como se puede ver a continuacion, se puede comprobar el estatus de la respuesta
      // es por ello que en este punto podemos hacer la comprobacion de que si se genera algun error en
      // la respuesta de la API, se puede hacer un redireccionamiento a la pagina de error 404
      .then((response) => {
        if (response.status === 404) {
          // En este punto cuando se detecte el error, es cuando podemos establecer el redireccionamiento
          navigate('/404');
        }
        // console.log(response.status);
        return response.json();
      })
      .then((data) => {
        setWord(data);
        console.log(data[0].meanings);
      });
  }, []);

  return (
    <>
      <h1>Here is a definition:</h1>
      <h2 className="font-bold">{word && word[0].word}</h2>
      <p>{word && word[0].phonetics[0].text}</p>
      <p className="font-bold">{word && word[0].meanings[0].partOfSpeech}</p>
      <p>{word && word[0].meanings[0].definitions[0].definition}</p>
    </>
  );
}

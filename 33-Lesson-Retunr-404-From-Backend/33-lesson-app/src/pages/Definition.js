import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";

export default function Definition() {
  const [word, setWord] = useState();
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  let { search } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
      // De esta manera como se puede ver a continuacion, se puede comprobar el estatus de la respuesta
      // es por ello que en este punto podemos hacer la comprobacion de que si se genera algun error en
      // la respuesta de la API, se puede hacer un redireccionamiento a la pagina de error 404
      .then((response) => {
        if (response.status === 404) {
          // En este punto cuando se detecte el error, es cuando podemos establecer el redireccionamiento
          setNotFound(true);
        } else if (response.status === 401) {
          navigate("/login");
        } else if (response.status === 500) {
          navigate("/login");
        }

        // Esto solo se produce en el caso de que alguno de los estados de error anteriores no se
        // genere, en cualquiera de los otros casos, si que se genera este error general se está implementando
        if (!response.ok) {
          // De esta manera, al poder establecer los errores como verdaderos, podemos implementar
          // una nueva condición para poder mostrar un nuevo error por pantalla o en el propio sitio web
          setError(true);

          throw new Error("Something went wrong");
        }

        // console.log(response.status);
        return response.json();
      })
      .then((data) => {
        setWord(data);
        console.log(data[0].meanings);
      })
      .catch((error) => {
        // EN ESTE PUNTO NOS ENCONTRAMOS EL ERROR, PERO, COMO PODEMOS OBSERVAR, COMO DE MANERA SIMILAR A
        // C++, HACEMOS USO DEL TIPO DE ERROR DE THROW PARA PODER CAPTURAR EL ERROR Y PODER MOSTRARLO
        // EN LA CONSOLA DEL NAVEGADOR MEDIANTE EL CATCH
        console.log(error.message);
      });
  }, []);

  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Go back to dictionary</Link>
      </>
    );
  } else {
    return (
      // Hay que tener en cuenta que para poder hacer la comprobacion de que si la palabra existe o no
      // existe, se debe de hacer con el operador ternario, ya que con un if-else no se puede hacer y no funciona
      word ? (
        <>
          <h1>Here is a definition:</h1>
          <h2 className="font-bold">{word && word[0].word}</h2>
          <p>{word && word[0].phonetics[0].text}</p>
          <p className="font-bold">
            {word && word[0].meanings[0].partOfSpeech}
          </p>
          <p>{word && word[0].meanings[0].definitions[0].definition}</p>

          {/* Como se puede ver, esta etiqueta que se puede observar a continuación, denominada como br, sirve y
          nos permite establecer un salto de línea entre el párrafo anterior y el siguiente párrrafo, permitiendo
          establecer lo que nosotros queremos */}
          <br></br>
          <p>Search again.</p>
          <DefinitionSearch />
        </>
      ) : (
        <>
          <h1 className="font-bold">Loading...</h1>
        </>
      )
    );
  }
}

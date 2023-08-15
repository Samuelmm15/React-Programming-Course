import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
    // const [word, setWord] = useState();
    // const [notFound, setNotFound] = useState(false);
    // const [error, setError] = useState(false);

    let {search} = useParams();
    const navigate = useNavigate();
    const [word, errorStatus] = useFetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search);

    useEffect(() => {
        console.log(word);
    });

    if (errorStatus === 404) {
        return (
            <>
                <NotFound/>
                <Link to="/dictionary">Go back to dictionary</Link>
            </>
        );
    } else {
        return (
            word ? (
                <>
                    <h1>Here is a definition:</h1>
                    <h2 className="font-bold">{word && word[0].word}</h2>
                    <p>{word && word[0].phonetics[0].text}</p>
                    <p className="font-bold">
                        {word && word[0].meanings[0].partOfSpeech}
                    </p>
                    <p>{word && word[0].meanings[0].definitions[0].definition}</p>
                    <br></br>
                    <p>Search again.</p>
                    <DefinitionSearch/>
                </>
            ) : (
                <>
                    <h1 className="font-bold">Loading...</h1>
                </>
            )
        );
    }
}

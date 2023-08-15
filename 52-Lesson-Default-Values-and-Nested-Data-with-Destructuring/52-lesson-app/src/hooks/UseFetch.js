import {useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


// Como podemos observar en este caso, se le añade a la función la capacidad de recibir métodos, encabezados y cuerpos
// esto, nos permite poder realizar operaciones mediante este hook del tipo POST, GET, etc
// Nótese que para el caso del empleo de los atributos de método, encabezado y cuerpo, nótese que no se hace uso
// de estas variables de manera independiente sino que se hace uso de estas como si fueran un objeto, es por ello
// que, se usan como si fuera un propio objeto
export default function useFetch(url, {method, headers, body}) {
    const [data, setData] = useState("");
    const [errorStatus, setErrorStatus] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch(url, {
            method: method,
            headers: headers,
            body: body
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
                if (!response.ok) {
                    throw(response.status);
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((e) => {
                setErrorStatus(e);
            })
    }, []);

    // At the lesson 51 we are going to return more information to complete this hook
    return {data: data, setData: setData, errorStatus: errorStatus};
}
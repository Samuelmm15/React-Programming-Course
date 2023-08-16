import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from "react-router-dom";

export default function useFetch(url, {method, headers, body} = {}) {
    const [data, setData] = useState("");
    const [errorStatus, setErrorStatus] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    function request() {
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
                    throw (response.status);
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((e) => {
                setErrorStatus(e);
            })
    }

    // Esta nueva función que se crea lo que realiza es la acción de añadir un nuevo cliente a la base de datos
    // en el momento que se pulsa el botón de añadir, es por ello, que esta función lo que realiza es siempre
    // esta acción.
    function appendData(newData) {
        // new fetch
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newData)
        }).then((response) => {
            if (response.status === 401) {
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname,
                    },
                });

                if (!response.ok) {
                    throw response.status;
                }
                return response.json();
            }
        }).then((d) => {
            // IMPORTANTE PARA ENTENDER
            /*
                En ese punto como podemos observar se hace uso de las sentencias Object.values(variable)[0],
                esta función la operación que realiza es la de coger dicha variable, tratarla como el objeto del
                que se trata y, dentro de dicho objeto se coge el elemento y la característica que se encuentra
                dentro de la posición 0 de este objeto, es por ello que esto nos permite hace uso de la función
                de appendData de manera general y no de manera especifica para que solo pueda ser usada dentro de
                la página de Customers, sino que se pueda hacer uso de dicha función dentro de cada una de las
                posteriores páginas que se vayan a usar.
             */
            const submitted = Object.values(d)[0];

            const newState= {...data};
            Object.values(newState)[0].push(submitted); // En este punto realizamos la creación de los nuevos objetos

            setData(newState); // El nuevo objeto que se añade a la lista, se introduce a esta en dicho punto
        }).catch((e) => {
            console.log(e);
            setErrorStatus(e);
        })
    }

    // At the lesson 51 we are going to return more information to complete this hook
    return {request, appendData, data: data, errorStatus: errorStatus};
}
import {useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

export default function useFetch(url, {method, headers, body} = {}) {
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
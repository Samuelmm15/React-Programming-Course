import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import CryptoSummary from "./components/CryptoSummary";
import {Crypto} from "./Types";

function App() {
    /*
        Nótese que el uso y empleo de dicha manera del useState hace referencia a que si el State contiene
        algo contiene un array de elementos que sigue la estructura definida anteriormente, en otro caso dicha variable
        es nula.
     */
    const [cryptos, setCryptos] = useState<Crypto[] | null>(null);

    useEffect(() => {
        const url =
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';
        // En este punto vamos a hacer uso de lo nuevo de axios. Cabe destacar que este es muy similar a un fetch
        axios.get(url).then((response) => {
            setCryptos(response.data);
        })
    }, []);
    return (
      <div className="App">
          {/*
                De la manera que podemos observar a continuación, funcionan los maps dentro de typscript, es decir
                dentro de dichos métodos se debe de hacer uso de un callback que nos permita imprimir en HTML
                los distintos elementos del array que se ha creado y que se ha establecido el tipo de datos de dicho
                array anteriormente como se ha podido observar.
            */}
          {cryptos ? cryptos.map((crypto) => {
              return <CryptoSummary crypto={crypto}/>
          }) : null}
      </div>
    );
}

export default App;

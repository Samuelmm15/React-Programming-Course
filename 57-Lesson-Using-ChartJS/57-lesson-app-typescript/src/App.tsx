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
  const [selected, setSelected] = useState<Crypto | null>();

  useEffect(() => {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';
    // En este punto vamos a hacer uso de lo nuevo de axios. Cabe destacar que este es muy similar a un fetch
    axios.get(url).then((response) => {
      setCryptos(response.data);
    })
  }, []);
  return (
    <>
      <div className="App">
        {/*
      Haciendo uso del select and option en HTML podemos crear de manera predeterminada un menú desplegable
      dónde, para este caso, cada uno de los distintas opciones que se encuentran dentro de dicho menú desplegable
      pues se establecen mediante el option que se encuentra dentro del select.
      */}
        <select onChange={(e) => {
          const c = cryptos?.find((x) => x.id === e.target.value);
          setSelected(c);
        }} defaultValue = "default">
          {/*
          De la manera que podemos observar a continuación y en la línea anterior, de dicha manera es como se
          establece alguna de las opciones del menú desplegable como la opción por defecto.
          */}
          <option value="default">Choose an option...</option>
          {cryptos ? cryptos.map((crypto) => {
            return <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
          }) : null}
        </select>
      </div>
      {selected ? <CryptoSummary crypto={selected}/> : null}
    </>
  )
    ;
}

export default App;

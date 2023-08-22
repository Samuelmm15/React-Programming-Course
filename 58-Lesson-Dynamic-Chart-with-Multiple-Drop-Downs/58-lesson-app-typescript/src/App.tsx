import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import CryptoSummary from "./components/CryptoSummary";
import {Crypto} from "./Types";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, ChartType,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import type {ChartData, ChartOptions} from 'chart.js';
// This is the new library called moment
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  /*
      Nótese que el uso y empleo de dicha manera del useState hace referencia a que si el State contiene
      algo contiene un array de elementos que sigue la estructura definida anteriormente, en otro caso dicha variable
      es nula.
   */
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();
  // Realizamos la creación de dos nuevas variables que nos permitan tener en cuenta los datos y las opciones de las gráficas
  // creadas mediante Chart.js
  const [data, setData] = useState<ChartData<'line'>>();
  const [options, setOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  });

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
          // request
          axios.get(`https://api.coingecko.com/api/v3/coins/${c?.id}/market_chart?vs_currency=usd&days=30&interval=daily`)
            .then((response) => {
              setData({
                labels: response.data.prices.map((price: number[]) => {
                  // Esto lo que nos permite es cambiar el tiempo de la gráfica haciendo uso de la librería moments.
                  return moment.unix(price[0] / 1000).format('MM-DD');
                }),
                datasets: [
                  {
                    label: 'Dataset 1',
                    data: response.data.prices.map((price: number[]) => {
                      return price[1];
                    }),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              });
            })
          // update data state
        }} defaultValue="default">
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
      {/*
      En este punto realizar el renderizado de la gráfica creada de la siguiente manera que se puede observar a
      continuación.
      */}
      {data ? <div style={{width: 600}}><Line options={options} data={data}/></div> : null}
    </>
  )
    ;
}

export default App;

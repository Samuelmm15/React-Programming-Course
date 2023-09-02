import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CryptoSummary from "./components/CryptoSummary";
import { Crypto } from "./Types";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartType,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
// This is the new library called moment
import moment from "moment";

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
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();

  const [range, setRange] = useState<number>(30);

  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
    // En este punto vamos a hacer uso de lo nuevo de axios. Cabe destacar que este es muy similar a un fetch
    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);

  // Cabe destacar que para este caso el array de dependencia que resulta del useEffect, cabe destacar que para este caso
  // en concreto se hace uso de la especificación de aquellos elementos que van a resultar como resultado de dicha función
  useEffect(() => {
    if (!selected) return;
    // OBSERVA: Como se puede ver en la URL de abajo, esta se puede retocar de la manera que nosotros queramos, teniendo en cuenta que dependiendo
    // de las variables que tengamos tras los eventos que realiza el usuario, podemos obtener una información u otra de la API que estamos usando para
    // poder generar el diagrama
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${
          selected?.id
        }/market_chart?vs_currency=usd&days={range}&${
          range === 1 ? "interval=hourly" : "interval=daily"
        }`
      )
      .then((response) => {
        setData({
          labels: response.data.prices.map((price: number[]) => {
            // IMPORTANTE: El uso del operador ternario en javascript o typescript en este caso es muy importante, ya que como podemos ver
            // se puede hacer uso de este en cualquier parte del código, hasta dentro de una función, y por tanto, es muy importante su uso y saber emplearlo de manera correcta.
            return moment.unix(price[0] / 1000).format(range === 1 ? 'HH:MM' : 'MM-DD');
          }),
          datasets: [
            {
              label: "Dataset 1",
              data: response.data.prices.map((price: number[]) => {
                return price[1];
              }),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      });
      setOptions({
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            // IMPORTANTE: Cabe destacar que para el caso del empleo de funciones dentro de cadenas de texto que salen por pantalla, siempre es mejor
            // hacer uso de las comillas de este tipo en javascript ``, que las de este tipo ''.
            text: `${selected?.name} Price Over Last` + range + (range === 1 ? `Day` : `Days`),
          },
        },
      });
  }, [selected, range]);

  return (
    <>
      <div className="App">
        {/*
      Haciendo uso del select and option en HTML podemos crear de manera predeterminada un menú desplegable
      dónde, para este caso, cada uno de los distintas opciones que se encuentran dentro de dicho menú desplegable
      pues se establecen mediante el option que se encuentra dentro del select.
      */}
        <select
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value);
            setSelected(c);
            // update data state
          }}
          defaultValue="default"
        >
          {/*
          De la manera que podemos observar a continuación y en la línea anterior, de dicha manera es como se
          establece alguna de las opciones del menú desplegable como la opción por defecto.
          */}
          <option value="default">Choose an option...</option>
          {cryptos
            ? cryptos.map((crypto) => {
                return (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name}
                  </option>
                );
              })
            : null}
        </select>
        <select
          onChange={(e) => {
            setRange(parseInt(e.target.value));
          }}
        >
          <option value={30}>30 days</option>
          <option value={7}>7 days</option>
          <option value={1}>1 days</option>
        </select>
      </div>
      {selected ? <CryptoSummary crypto={selected} /> : null}
      {/*
      En este punto realizar el renderizado de la gráfica creada de la siguiente manera que se puede observar a
      continuación.
      */}
      {data ? (
        <div style={{ width: 600 }}>
          <Line options={options} data={data} />
        </div>
      ) : null}
    </>
  );
}

export default App;

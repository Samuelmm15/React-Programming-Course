import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Hay que tener en cuenta que el modo estricto se quita para que cuando se ejecute la aplicación o la página
  // sólo se ejecute esta una única vez y no se tenga que ejecutar dos veces como cuando se usa el modo estricto
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
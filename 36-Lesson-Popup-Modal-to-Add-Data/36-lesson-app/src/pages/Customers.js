import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/addCustomer";

export default function Customers() {
  const [customers, setCustomers] = useState('');

  useEffect(() => {
    const url = baseUrl + "api/customers/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []);

  function newCustomer(name, industry) {
    console.log("Adding new customer...");
    const data = { name: name, industry: industry };
    const url = baseUrl + "api/customers/";

    // NOTA: Hay que tener cuidado con los headers que si se escriben de manera incorrecta no funciona
    // la operación de POST, generando numerosos errores, generando que al enviar el JSON a la API, esta devuelva el error 415
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        console.log('Alcanza este punto del código');
        return response.json();
      })
      .then((data) => {
        // assume that the add was succesfull
        // hide the modal
        // make sure that the list was updated
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <h1>Here are our Customers:</h1>
      {/* La etiqueta ul en HTML sirve para crear listas no ordenadas */}
      <ul>
        {customers
          ? customers.map((customer) => {
              return (
                // La etiqueta li en HTML sirve para crear elementos de una lista
                <li key={customer.id}>
                  <Link to={"/customers/" + customer.id}>{customer.name}</Link>
                </li>
              );
            })
          : null}
      </ul>
      <AddCustomer newCustomer={newCustomer} />
    </>
  );
}
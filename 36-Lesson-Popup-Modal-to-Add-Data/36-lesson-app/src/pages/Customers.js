import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";

export default function Customers() {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    const url = baseUrl + "api/customers/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []);

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
    </>
  );
}

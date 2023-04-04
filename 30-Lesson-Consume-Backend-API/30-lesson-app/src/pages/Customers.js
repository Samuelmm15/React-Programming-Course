import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    // TENER CUIDADO POR COMO SE ESCRIBE LA PRIMERA SENTENCIA DEL PRIMER .THEN
    // Estaba generando error el no ponerlo exactamente igual que en el ejemplo que se puede observar a continuación
    // .then((response) => response.json()) --> esta es la manera correcta de ponerlo
    // .then((responser) ==> {responser.json()}) --> esta es la manera incorrecta de ponerlo
    console.log("Fetching...");
    fetch("http://localhost:8000/api/customers/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []);

  return (
    <>
      <h1>Here are our Customers:</h1>
      {customers
        ? customers.map((customer) => {
            return <p>{customer.name}</p>;
          })
        : null}
    </>
  );
}

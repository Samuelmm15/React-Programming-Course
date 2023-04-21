import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/addCustomer";

export default function Customers() {
  const [customers, setCustomers] = useState("");
  // Esta variable se encarga de mostrar el modal de añadir un nuevo cliente, para ello se crea una variable
  // que permite mostrar el modal cuando nosotros queramos y cuando no queramos.
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

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
        console.log("Alcanza este punto del código");
        return response.json();
      })
      .then((data) => {
        // assume that the add was succesfull
        // hide the modal
        toggleShow(); // De esta manera haciendo uso de esta función, únicamente cuando se reciban los datos de la API
        // correspondientes con que se ha realizado la operación de manera correcta, pues, en ese punto se cierra el pop-up de manera automática de esta manera
        // make sure that the list was updated
        console.log(data);
        // De esta manera lo que se realiza es que cuando se añada un nuevo cliente, se añada a la lista de clientes
        // y por tanto se actualice la lista de clientes en tiempo real.
        setCustomers([...customers, data.customers]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <h1>Here are our Customers:</h1>
      {/* La etiqueta ul en HTML sirve para crear listas no ordenadas */}
      {customers
        ? customers.map((customer) => {
            return (
              // La etiqueta li en HTML sirve para crear elementos de una lista
              <div className="m-2" key={customer.id}>
                <Link to={"/customers/" + customer.id}>
                  <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })
        : null}
      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}

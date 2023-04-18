import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [tempCustomer, setTempCustomer] = useState("");
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // NOTA: Para la comparación de objetos como en este caso, es mejor hacer uso del useEffect ya que lo que realiza es la
  // comparación de los objetos en este caso cuando se realiza algún cambio, en cambio, cuando se hace uso de funciones
  // para la comparación de objetos, se tiene que especificar la zona del código en la que se produce dicha comparación,
  // por tanto esto es mucho menos óptico en cualquier caso
  useEffect(() => {
    console.log(customer, tempCustomer);
    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;

    if (customer.industry !== tempCustomer.industry) equal = false;

    if (equal === true) setChanged(false);
    console.log(changed);
  });

  useEffect(() => {
    const url = baseUrl + "api/customers/" + id;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          // redirect to a 404 page (new URL)
          // navigate("/404");
          // render a 404 component in this page
          setNotFound(true);
        }

        if (!response.ok) {
          console.log('response', response);
          throw new Error('Something went wrong, try again later');
        }

        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(undefined);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }, []);

  function updateCustomer() {
    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("response", response);
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        console.log(data);
        setError(undefined);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }

  return (
    <>
      {notFound ? (
        <div>
          <h1>The customer with the id {id} was not found</h1>
        </div>
      ) : null}
      {customer ? (
        <div>
          {/* <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.id}
          /> */}
          <p className="m-2 block px-2">ID: {tempCustomer.id}</p>
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.name}
            // De esta manera es como se está realizando el cambio de estado de la variable tempCustomer para poder crear un formulario dinámico para este caso
            onChange={(e) => {
              setTempCustomer({ ...tempCustomer, name: e.target.value });
              setChanged(true);
            }}
          />
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setTempCustomer({ ...tempCustomer, industry: e.target.value });
              setChanged(true);
            }}
          />
          {changed ? (
            <>
              <button
                className="m-2 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  setChanged(false);
                  setTempCustomer({ ...customer });
                }}
              >
                Cancel
              </button>
              {/* Hay que tener cuidado al llamar a las funciones que si hacemos uso de la manera updateCustomer() da muchos errores
              si dicha función no tiene parametros mejor no poner nada de parentesis ni nada */}
              <button
                className="m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={updateCustomer}
              >
                Save
              </button>
            </>
          ) : null}

          <button
            onClick={(e) => {
              console.log("deleting...");
              const url = baseUrl + "api/customers/" + id;
              // DE ESTA MANERA COMO PODEMOS OBSERVAR A CONTINUACIÓN PODEMOS ESPECIFICAR EL TIPO DE PETICIÓN QUE SE
              // VA A REALIZAR A LA API, EN ESTE CASO ES UNA PETICIÓN DE TIPO DELETE

              // NOTA: Hay que tener en cuenta que la segunda parte de la función fetch(), el apartado de headers no
              // es necesario poner para el correcto funcionamiento de esta operación de eliminación de un objeto, pero,
              // si que se trata de una buena práctica ponerlo para que el servidor sepa que tipo de contenido se está
              // enviando en la petición.
              fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Something went wrong");
                  }
                  // Para el caso en el que las cosas vayan bien y de manera correcta.
                  // return response.json();
                  setError(undefined);
                  navigate("/customers");
                })
                .catch((e) => {
                  console.log(e);
                  setError(e.message);
                });
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link to="/customers">Go back</Link>
    </>
  );
}

// function deleteCustomer() {
//   console.log("deleting...");
// }

import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }

        if (!response.ok) {
          console.log("response", response);
          throw new Error("Something went wrong, try again later");
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

  function updateCustomer(e) {
    // preventDefault sirve para evitar que se recargue la página
    e.preventDefault();
    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
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
    <div class="p-3">
      {notFound ? (
        <div>
          <h1>The customer with the id {id} was not found</h1>
        </div>
      ) : null}
      {customer ? (
        <div>
          <form
            className="w-full max-w-sm"
            id="customer"
            onSubmit={updateCustomer}
          >
            <p className="m-2 block px-2">ID: {tempCustomer.id}</p>
            <div className="md:flex md:items-center mb-6">
              {/* El establecimiento del for dentro del label y del id dentro de los inputs, nos permite
          que cuando se haga uso de algun sistema de autofill para el usuario o cosas así, esto funcione de manera correcta
          gracias al establecimiento de un identificador */}
              <div className="md:w-1/4">
                <label for="name">Name</label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="name"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                    setChanged(true);
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="idustry">Industry</label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="industry"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                    setChanged(true);
                  }}
                />
              </div>
            </div>
          </form>
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
                form="customer"
                className="m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </>
          ) : null}

          <button
            className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
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
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("access"),
                },
              })
                .then((response) => {
                  if (response.status === 401) {
                    navigate("/login", {
                      state: {
                        previousUrl: location.pathname,
                      },
                    });
                  }
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
      <Link
        className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        to="/customers"
      >
        ← Go back
      </Link>
    </div>
  );
}

// function deleteCustomer() {
//   console.log("deleting...");
// }

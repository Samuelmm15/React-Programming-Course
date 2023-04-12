import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

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
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
      });
  }, []);

  return (
    <>
      {notFound ? (
        <div>
          <h1>The customer with the id {id} was not found</h1>
        </div>
      ) : null}
      {customer ? (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
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
              navigate("/customers");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Delete
      </button>
      <br />
      <Link to="/customers">Go back</Link>
    </>
  );
}

// function deleteCustomer() {
//   console.log("deleting...");
// }

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const url = baseUrl + 'api/customers/' + id;
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
      <Link to="/customers">Go back</Link>
    </>
  );
}

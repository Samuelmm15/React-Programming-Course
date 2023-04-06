import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <p>The page that you are looking for is not found</p>
      <Link to="/dictionary">Go back to dictionary</Link>
    </>
  );
}

import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <p>
        To <Link to="/products">products</Link>.
      </p>
    </>
  );
};

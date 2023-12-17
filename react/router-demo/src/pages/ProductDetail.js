import { useParams, Link } from "react-router-dom";

export const ProductDetailPage = () => {
  const params = useParams();

  return (
    <>
      <h1>Product {params.id}'s details</h1>
      <Link to=".." relative="path">
        Back
      </Link>
    </>
  );
};

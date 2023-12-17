import { useParams, Link } from "react-router-dom";

export const EditEventPage = () => {
  const params = useParams();

  return (
    <>
      <h1>Edit Event {params.id}</h1>
      <Link to=".." relative="path">
        Cancel
      </Link>
    </>
  );
};

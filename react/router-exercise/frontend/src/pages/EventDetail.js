import { useParams, Link } from "react-router-dom";

export const EventDetailPage = () => {
  const params = useParams();

  return (
    <>
      <h1>Event Detail for {params.id}</h1>
      <div>
        <Link to=".." relative="path">
          Back
        </Link>
      </div>
      <div>
        <Link to="edit">Edit</Link>
      </div>
    </>
  );
};

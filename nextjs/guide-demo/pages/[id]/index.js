import MeetupDetail from "../../components/meetups/MeetupDetail";
import { fetch_collection } from "../../utils/external";
import { ObjectId } from "mongodb";
import Head from "next/head";

const Detail = (props) => {
  return (
    <>
      <Head>
        <title>{props.chosen.title}</title>
        <meta name="description" content={props.chosen.description} />
      </Head>
      <MeetupDetail
        image={props.chosen.image}
        title={props.chosen.title}
        address={props.chosen.address}
        description={props.chosen.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const [collection, client] = await fetch_collection();
  const ids = await collection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    // true / "blocking": server will generate the page for req
    // false: 404 if not exist;
    fallback: false,
    paths: ids.map((item) => ({
      params: {
        id: item._id.toString(),
      },
    })),
    /*
    paths: [
      {
        params: {
          id: "m1",
        },
      },
      {
        params: {
          id: "m2",
        },
      },
    ],
    */
  };
};

export const getStaticProps = async (context) => {
  // Fetch detail from remote API
  const id = context.params.id;

  // log printed out at server side
  //console.log(id);

  const [collection, client] = await fetch_collection();
  const chosen = await collection.findOne({ _id: new ObjectId(id) });
  //console.log(chosen);
  client.close();

  return {
    props: {
      chosen: {
        id: chosen._id.toString(),
        title: chosen.data.title,
        address: chosen.data.address,
        image: chosen.data.image,
        description: chosen.data.description,
      },
    },
  };
};

export default Detail;

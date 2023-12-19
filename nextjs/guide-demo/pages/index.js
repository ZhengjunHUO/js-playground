import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

/*
const MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Fontainebleau_-_Ch%C3%A2teau_-_Etang_aux_Carpes.jpg/1280px-Fontainebleau_-_Ch%C3%A2teau_-_Etang_aux_Carpes.jpg",
    address: "Fontainebleau",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chateau_Versailles_Galerie_des_Glaces.jpg/1280px-Chateau_Versailles_Galerie_des_Glaces.jpg",
    address: "Château de Versailles",
    description: "This is a second meetup!",
  },
];
*/

const HomePage = (props) => {
  return <MeetupList meetups={props.data} />;
};

// Run only on the server (not visible for client)
// pregenerated for every incoming request !
/*
export const getServerSideProps = (context) => {
  const req = context.req;
  const res = context.res;

  // Fetch data from remote API
  return {
    props: {
        data: MEETUPS
    },
  };
}
*/

// Only available in PAGE component files, called at first place
// not visible/excuted at client side; Static Site Generation
export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://firelouis:Y91NfR2lb5mPa5qV@clusterforreact.th81rp3.mongodb.net/nextjs?retryWrites=true&w=majority",
  );
  const db = client.db();
  const collection = db.collection("nextjs");

  const rslt = await collection.find().toArray();
  // server side log output
  //console.log(rslt);
  client.close();

  return {
    props: {
      data: rslt.map((entry) => ({
        title: entry.data.title,
        address: entry.data.address,
        image: entry.data.image,
        id: entry._id.toString(),
      })),
    },
    // regenerate on the server every hour
    revalidate: 3600,
  };
};

export default HomePage;

import MeetupList from "../components/meetups/MeetupList";

const MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Fontainebleau_-_Ch%C3%A2teau_-_Etang_aux_Carpes.jpg/1280px-Fontainebleau_-_Ch%C3%A2teau_-_Etang_aux_Carpes.jpg",
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

const HomePage = (props) => {
  return <MeetupList meetups={props.data} />;
};

// Only available in PAGE component files, called at first place
// not visible/excuted at client side 
export const getStaticProps = () => {
  // TODO Fetch data from remote API
  return {
    props: {
        data: MEETUPS
    }
  };
};

export default HomePage;
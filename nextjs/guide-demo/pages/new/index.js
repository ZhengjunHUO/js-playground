import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetPage = () => {
  const addHandler = (data) => {
    console.log(data);
  };

  return <NewMeetupForm onAddMeetup={addHandler} /> 
};

export default NewMeetPage;
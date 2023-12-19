import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

const NewMeetPage = () => {
  const router = useRouter();

  const addHandler = async (data) => {
    const resp = await fetch("/api/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respData = await resp.json();
    // log printed out at client side (browser console)
    console.log(respData);

    router.push("/");
  };

  return <NewMeetupForm onAddMeetup={addHandler} />;
};

export default NewMeetPage;

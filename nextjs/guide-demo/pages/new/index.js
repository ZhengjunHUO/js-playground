import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

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

  return (
    <>
      <Head>
        <title>Add sth here</title>
        <meta name="description" content="Add something here" />
      </Head>
      <NewMeetupForm onAddMeetup={addHandler} />;
    </>
  );
};

export default NewMeetPage;

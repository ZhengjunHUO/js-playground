import MainNavigation from "../components/MainNavigation";

export const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Oops !</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
};

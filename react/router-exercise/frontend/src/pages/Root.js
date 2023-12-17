import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

export const RootLayout = () => {
  const nvg = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {nvg.state === "loading" && <p>Loading ...</p>}
        <Outlet />
      </main>
    </>
  );
};

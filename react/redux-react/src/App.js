import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";

function App() {
  const isAuthed = useSelector((state) => state["auth"].isAuthed);

  return (
    <>
      <Header />
      {(!isAuthed && <Auth />) || <UserProfile />}
      <Counter />
    </>
  );
}

export default App;

import { useState } from "react";
import { Form } from "./components/Input/Form.js";
import { List } from "./components/Output/List.js";

function App() {
  const [rsltList, setRsltList] = useState([]);

  const appendList = (data) => {
    setRsltList((prev) => [data, ...prev]);
  };

  return (
    <>
      <Form onClickSubmit={appendList} />
      <List list={rsltList} />
    </>
  );
}

export default App;

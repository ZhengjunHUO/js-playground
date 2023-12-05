import { useState } from "react";
import "./NewItem.css";
import { Form } from "./Form";

export const NewItem = (props) => {
  const [showButton, setShowButton] = useState(true);

  const flipFlag = () => {
    setShowButton((prev) => !prev);
  };

  const submitItemDataHandler = (data) => {
    const itemData = {
      ...data,
      id: Math.random().toString(),
    };
    props.onAddItem(itemData);
  };

  return (
    <div className="new-item">
      {showButton ? (
        <button onClick={flipFlag}>New</button>
      ) : (
        <Form
          onSubmitItemData={submitItemDataHandler}
          onClickButton={flipFlag}
        />
      )}
    </div>
  );
};

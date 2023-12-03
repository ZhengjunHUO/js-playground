import "./NewItem.css";
import { Form } from "./Form";

export const NewItem = (props) => {
  const submitItemDataHandler = (data) => {
    const itemData = {
      ...data,
      id: Math.random().toString(),
    };
    props.onAddItem(itemData);
  };

  return (
    <div className="new-item">
      <Form onSubmitItemData={submitItemDataHandler} />
    </div>
  );
};

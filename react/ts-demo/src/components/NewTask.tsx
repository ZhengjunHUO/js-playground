import { useRef, useContext } from "react";
import styles from "./NewTask.module.css";
import { TaskContext } from "../store/tasks-context";

//export const NewTask: React.FC<{ onAddTask: (content: string) => void }> = (props) => {
export const NewTask: React.FC = () => {
  const ctx = useContext(TaskContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = inputRef.current!.value;
    if (enteredText.trim().length === 0) {
      // TODO throw an error
      return;
    }

    ctx.addHandler(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <label htmlFor="text">New task</label>
      <input type="text" id="text" ref={inputRef} />
      <button>Add new task</button>
    </form>
  );
};

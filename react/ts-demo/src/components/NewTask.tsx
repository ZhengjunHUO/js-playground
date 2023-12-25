import { useRef } from "react";
import styles from "./NewTask.module.css";

export const NewTask: React.FC<{ onAddTask: (content: string) => void }> = (
  props,
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = inputRef.current!.value;
    if (enteredText.trim().length === 0) {
      // TODO throw an error
      return;
    }

    props.onAddTask(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <label htmlFor="text">New task</label>
      <input type="text" id="text" ref={inputRef} />
      <button>Add new task</button>
    </form>
  );
};

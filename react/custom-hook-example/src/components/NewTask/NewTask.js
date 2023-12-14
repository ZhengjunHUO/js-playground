import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import { useFetch } from "../../hooks/use-fetch";

const NewTask = (props) => {
  const { isLoading, error, fetchHandler } = useFetch();

  const genNewTask = (taskText, data) => {
    const generatedId = data.name;
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    const config = {
      url: "https://react-921c9-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      option: {
        method: "POST",
        body: JSON.stringify({ text: taskText }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    fetchHandler(config, genNewTask.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

//import { useState } from "react";
import { TaskList } from "./components/TaskList";
import { NewTask } from "./components/NewTask";
import { TaskContextProvider } from "./store/tasks-context";
//import Task from "./models/task";

function App() {
  /*
  const tasks = [
    new Task("Finish React"),
    new Task("Renforcer Rust"),
    new Task("Refresh C++"),
  ];
  */

  /*
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTaskHandler = (content: string) => {
    const newTask = new Task(content);

    setTasks((prev) => {
      return prev.concat(newTask);
    });
  };

  const delTaskHandler = (id: string) => {
    setTasks((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  */

  /*<div>
      <NewTask onAddTask={addTaskHandler} />
      <TaskList tasks={tasks} onDelTask={delTaskHandler} />
  </div>*/
  return (
    <TaskContextProvider>
      <NewTask />
      <TaskList />
    </TaskContextProvider>
  );
}

export default App;

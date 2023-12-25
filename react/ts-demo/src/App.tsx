import { TaskList } from "./components/Tasklist";
import Task from "./models/task";

function App() {
  const tasks = [
    new Task("Finish React"),
    new Task("Renforcer Rust"),
    new Task("Refresh C++"),
  ];

  return (
    <div>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;

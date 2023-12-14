import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { useFetch } from "./hooks/use-fetch";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, fetchHandler } = useFetch();

  useEffect(() => {
    const config = {
      url: "https://react-921c9-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      option: {
        method: "GET",
        headers: {},
        body: null,
      },
    };

    const buildList = (data) => {
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchHandler(config, buildList);
  }, [fetchHandler]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchHandler}
      />
    </React.Fragment>
  );
}

export default App;

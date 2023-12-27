import React, { useState } from "react";
import Task from "../models/task";

type TaskContextStruct = {
  data: Task[];
  addHandler: (content: string) => void;
  delHandler: (id: string) => void;
};

export const TaskContext = React.createContext<TaskContextStruct>({
  data: [],
  addHandler: () => {},
  delHandler: () => {},
});

export const TaskContextProvider: React.FC<React.PropsWithChildren> = (
  props,
) => {
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

  const contextValue: TaskContextStruct = {
    data: tasks,
    addHandler: addTaskHandler,
    delHandler: delTaskHandler,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {props.children}
    </TaskContext.Provider>
  );
};

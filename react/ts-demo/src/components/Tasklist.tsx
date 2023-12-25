import React from "react";
import Task from "../models/task";

export const TaskList: React.FC<{ tasks: Task[] }> = (props) => {
  return (
    <ul>
      {props.tasks.map((task) => (
        <li key={task.id}>{task.content}</li>
      ))}
    </ul>
  );
};

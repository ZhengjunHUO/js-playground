import React from "react";
import Task from "../models/task";
import { TaskDetail } from "./TaskDetail";
import styles from "./TaskList.module.css";

export const TaskList: React.FC<{
  tasks: Task[];
  onDelTask: (id: string) => void;
}> = (props) => {
  return (
    <ul className={styles.tasklist}>
      {props.tasks.map((task) => (
        <TaskDetail
          detail={task}
          delTask={props.onDelTask.bind(null, task.id)}
        />
      ))}
    </ul>
  );
};

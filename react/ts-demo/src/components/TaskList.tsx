import React, { useContext } from "react";
//import Task from "../models/task";
import { TaskDetail } from "./TaskDetail";
import styles from "./TaskList.module.css";
import { TaskContext } from "../store/tasks-context";

/*
export const TaskList: React.FC<{
  tasks: Task[];
  onDelTask: (id: string) => void;
}> = (props) => {
  */
export const TaskList: React.FC = () => {
  const ctx = useContext(TaskContext);
  return (
    <ul className={styles.tasklist}>
      {ctx.data.map((task) => (
        <TaskDetail
          detail={task}
          delTask={ctx.delHandler.bind(null, task.id)}
        />
      ))}
    </ul>
  );
};

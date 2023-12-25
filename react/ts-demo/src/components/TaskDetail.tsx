import React from "react";
import Task from "../models/task";
import styles from "./TaskDetail.module.css";

export const TaskDetail: React.FC<{
  detail: Task;
  delTask: () => void;
}> = (props) => {
  return (
    <li className={styles.item} key={props.detail.id} onClick={props.delTask}>
      {props.detail.content}
    </li>
  );
};

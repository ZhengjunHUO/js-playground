import styles from "./Input.module.css";

export const Input = (props) => {
  return (
    <div className={styles["input"]}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

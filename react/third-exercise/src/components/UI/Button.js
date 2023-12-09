import styles from "./Button.module.css";

export const Button = (props) => {
  return (
    <button
      className={styles["button"]}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

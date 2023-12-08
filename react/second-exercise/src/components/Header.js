import logo from "../assets/investment-calculator-logo.png";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles["header"]}>
      <img src={logo} alt="logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
};

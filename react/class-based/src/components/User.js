import { Component } from "react";
import styles from "./User.module.css";

class User extends Component {
  //constructor() {}
  render() {
    return <li className={styles.user}>{this.props.name}</li>;
  }
}

/*
const User = (props) => {
  return <li className={styles.user}>{props.name}</li>;
};
*/

export default User;

import React, {Component} from "react";
import  styles from "./Login.module.css";

class LoginForm extends Component{
    render(){
        let {submit, updatePassword, updateUsername, username, password} = this.props;
        return (
          <form onSubmit={submit} className={styles["form"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="username" className={styles["label"]}>
                username
              </label>
              <input
                type="username"
                name="username"
                onChange={updateUsername}
                value={username}
                className={styles["input"]}
              ></input>
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="password" className={styles["label"]}>
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                className={styles["input"]}
              ></input>
            </div>
            <div>
              <input
                type="submit"
                value="Login"
                className={styles["btn"]}
              ></input>
            </div>
          </form>
        );
    }
}

export default LoginForm;
import React, {Component} from "react";
import styles from "../Login/Login.module.css";
import PropTypes from "prop-types";

class RegisterForm extends Component{
    render(){
        let {submit, updateUserName, updateEmail, updatePassword, updateChangePassword, username, email, password, confirmPassword} = this.props;
        return (
          <form onSubmit={submit} className={styles["form"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="username" className={styles["label"]}>
                Username
              </label>
              <input
                type="username"
                name="username"
                onChange={updateUserName}
                value={username}
                className={styles["input"]}
              ></input>
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="email" className={styles["label"]}>
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={updateEmail}
                value={email}
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
            <div className={styles["form-group"]}>
              <label htmlFor="confirmPassword" className={styles["label"]}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={updateChangePassword}
                value={confirmPassword}
                className={styles["input"]}
              ></input>
            </div>
            <div>
              <input
                type="submit"
                value="Register"
                className={styles["btn"]}
              ></input>
            </div>
          </form>
        );
    }
}

RegisterForm.propTypes={
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  updateChangePassword: PropTypes.func.isRequired,
}

export default RegisterForm;
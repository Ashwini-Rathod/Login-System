import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./AddTask.module.css";

class AddTask extends Component{
    render(){
        let {submit, handleChange, task} = this.props;
        console.log(task);
        return (
          <div className={styles["container"]}>
            <form onSubmit={submit}>
              <input
                className={styles["input"]}
                type="text"
                name="task"
                onChange={handleChange}
                value={task}
              ></input>
              <button type="submit" className={styles["btn"]}>ADD</button>
            </form>
          </div>
        );
    }
}

AddTask.propTypes={
  submit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
}

export default AddTask;
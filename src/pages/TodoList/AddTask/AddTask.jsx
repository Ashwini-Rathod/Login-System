import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./AddTask.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons"

class AddTask extends Component{
    render(){
        let {submit, handleChange, task} = this.props;
        return (
          <div  className={styles["container"]}>
          <div >
            <form onSubmit={submit}>
              <input
                data-testid="add-task-input"
                className={styles["input"]}
                type="text"
                name="task"
                onChange={handleChange}
                value={task}
              ></input>

            </form>
          </div>
          <div>
          <button type="submit" onClick={submit} className={styles["add"]}>
                <FontAwesomeIcon icon={faPlusCircle} size="3x" className={styles["plus"]}></FontAwesomeIcon>
              </button>
          </div>
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
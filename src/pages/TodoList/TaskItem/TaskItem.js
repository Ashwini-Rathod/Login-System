import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../TodoApp/Todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

class TaskItem extends Component {
  render() {
    let { tasks } = this.props;
    return (
      <>
        {tasks.map((task) => {
          return (
            <div key={task.taskId} className={styles["dummy-container"]}>
              <div>
                {task.status === "Completed" ? (
                  <p
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                    }}
                    className={styles["dummy-p"]}
                  >
                    {task.taskName}
                  </p>
                ) : (
                  <Link
                    to={{
                      pathname: `/task/${task.taskId}`,
                      state: task,
                    }}
                    className={styles["link"]}
                  >
                    <p className={styles["dummy-p"]}>{task.taskName}</p>
                  </Link>
                )}
              </div>
              <div>
                <button onClick={() => this.props.edit(task.taskId)}>
                  <FontAwesomeIcon icon={faPen} color="blue"></FontAwesomeIcon>
                </button>
                <button onClick={() => this.props.update(task.taskId)}>
                  <FontAwesomeIcon icon={faClipboardCheck} color="green" />
                </button>
                <button onClick={() => this.props.delete(task.taskId)}>
                  <FontAwesomeIcon icon={faTrash} color="red" />
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default TaskItem;

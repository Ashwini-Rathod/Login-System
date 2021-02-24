import React, {Component} from "react";
import {Link} from "react-router-dom";
import styles from "../TodoApp/Todo.module.css";

class TaskItem extends Component{
    render(){
        let {task} = this.props;
        return(
            <div>
            {
                task.status === "Completed" ? 
                (
                    <p style={{
                        textDecoration: "line-through",
                        color: "gray"       
                    }} 
                    className={styles["dummy-p"]}
                    >{task.taskName}</p> 

                ) : (
                    <Link to={
                        {
                            pathname: `/task/${task.taskId}`,
                            state: task
                        }
                    } 
                        className={styles["link"]}>
                            <p className={styles["dummy-p"]}>{task.taskName}</p> 
                    </Link>
                )
            }
           
        </div>
            
        )
    }
}

export default TaskItem;
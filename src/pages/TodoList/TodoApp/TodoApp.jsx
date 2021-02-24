import React, { Component } from "react";
import styles from "./Todo.module.css";
import AddTask from "../AddTask/AddTask";
import TaskItem from "../TaskItem/TaskItem";
import Today from "../../../components/Today/Today";
import fetchCall from "../../../utils/fetchCalls";
import { validateTask } from "../../../utils/validation";

export const url = "https://todo-backend-user.herokuapp.com/todolist/tasks";

class Dummy extends Component {
  state = {
    edited: false,
    newTask: "",
    tasks: [],
    isLoggedIn: true,
  };

  updateStatus = (id) => {
    fetchCall(`${url}/${id}`, "PATCH")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ tasks: data.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteTask = (id) => {
    fetchCall(`${url}/${id}`, "DELETE")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let todoList = [...this.state.tasks];
        let result = todoList.findIndex((todo) => {
          return todo.taskId === id;
        });
        todoList.splice(result, 1);
        this.setState({ tasks: todoList });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editTask = (id) => {
    const newTask = prompt("Change your Todo :)");
    if (validateTask(newTask)) {
      return alert("Invalid Input");
    }
    fetchCall(`${url}/${id}`, "PUT", {taskName: newTask})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ tasks: data.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.renderTasks();
  };

  renderTasks = () => {
    fetchCall(url, "GET")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return new Error("Invalid Login");
      })
      .then((data) => {
        this.setState({ tasks: [...data.data[0]] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newTask) {
      fetchCall(url, "POST", {taskName: this.state.newTask})
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.status === "Unsuccesful") {
            return alert(data.message);
          }

          let cloneTodoList = [...this.state.tasks];
          cloneTodoList.push(data.data[0][0]);
          this.setState({ tasks: cloneTodoList });
          this.setState({ newTask: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return alert("Empty Input");
    }
  };
  render() {
    return (
      <div>
        <div className={styles["main-div"]}>
          <div>
            <h2 className={styles["plan"]}>What's your plan for today?</h2>
            <Today />
          </div>
          <AddTask
            submit={this.handleSubmit}
            handleChange={this.handleChange}
            task={this.state.newTask}
          />
          <TaskItem
            tasks={this.state.tasks}
            delete={this.deleteTask}
            edit={this.editTask}
            update={this.updateStatus}
          />
        </div>
      </div>
    );
  }
}

export default Dummy;

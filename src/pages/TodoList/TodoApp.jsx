import React,{ Component } from "react";
import Cookies from "js-cookie";
import styles from "./Todo.module.css";
import AddTask from "./AddTask";
import {validateTask} from "../../utils/validation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons"; 
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {faPen} from "@fortawesome/free-solid-svg-icons";

const url = "https://todo-backend-user.herokuapp.com/todolist/tasks";

class Dummy extends Component {
    state = {
        edited: false,
        newTask: "",
        tasks: [],
        isLoggedIn: true,
    }

    updateStatus =(id) => {
        fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${Cookies.get("jwt")}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ tasks: data.data[0] });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    deleteTask =(id) => {
        fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${Cookies.get("jwt")}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
            let todoList = [...this.state.tasks];
            let result = todoList.findIndex((todo)=>{
                return todo.taskId === id;
                })
            todoList.splice(result, 1);
            this.setState({tasks: todoList});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    editTask = (id) =>{
        const newTask = prompt("Change your Todo :)");
        if(validateTask(newTask)){
            return alert("Invalid Input");
        };
        fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify({ taskName: newTask })
        })
        .then((res)=>{
            // console.log(res);
            return res.json();
        })
        .then((data)=>{
            this.setState({tasks: data.data[0]});
            // console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    componentDidMount = () => {
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${Cookies.get("jwt")}`,
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return new Error("Invalid Login");
            })
            .then((data) => {
                this.renderTasks();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    renderTasks = () => {
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${Cookies.get("jwt")}`,
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return new Error("Invalid Login");
            })
            .then((data) => {
                console.log(data);
                this.setState({ tasks: [...data.data[0]] })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    handleChange = (e) =>{
        console.log(e.target.value);
        this.setState({newTask : e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log();
        if(this.state.newTask){
            fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type' : "application/json",
                  'Authorization': `Bearer ${Cookies.get("jwt")}`,
                  
                },
                body: JSON.stringify({ taskName: this.state.newTask }),
              })
              .then((res)=>{
                return res.json();
              })
              .then((data)=>{
                console.log(data);
                if(data.status === "Unsuccesful"){
                   return alert(data.message);
                }
                
                    let cloneTodoList = [...this.state.tasks];
                    cloneTodoList.push(data.data[0][0]);
                    this.setState({tasks: cloneTodoList})
                    this.setState({newTask: ""})
                
              })
              .catch((err)=>{
                console.log(err);
              })
        }
        else{
            return alert("Empty Input");
        }
        
    }


 

    render() {
        return (
            <div className={styles["main-div"]}>
                <div>
                    <div>
                        <h1 className={styles["dummy-heading"]}>Let's start coding...!!</h1>
                    </div>
                    <AddTask
                        submit={this.handleSubmit}
                        handleChange={this.handleChange}
                        task={this.state.newTask}
                    />
                    <div>
                        {
                            this.state.tasks.map((task) => {
                                return (
                                    <div key={task.taskId} className={styles["dummy-container"]}>
                                        <div>
                                            <p style={{
                                                textDecoration: task.status === "Completed" ?
                                                    (
                                                        "line-through"
                                                    ) :
                                                    (
                                                        ""
                                                    )
                                            }} className={styles["dummy-p"]}>{task.taskName}</p>
                                        </div>
                                        <div>
                                            <button onClick={() => this.editTask(task.taskId)} ><FontAwesomeIcon icon={faPen}/></button>
                                            <button onClick={() => this.updateStatus(task.taskId)}><FontAwesomeIcon icon={faCheck}/></button>
                                            <button onClick={() => this.deleteTask(task.taskId)} ><FontAwesomeIcon icon={faTrash}/></button>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Dummy;

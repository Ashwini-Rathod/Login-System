import { Component } from "react";
import Cookies from "js-cookie";
import styles from "./Dummy.module.css";
// import Login from "./Login";
// import Nav from "../components/Nav";
// import Footer from "../components/Footer";
import store from "../store/store";
import userActionGenerator from "../actions/userActionGenerator";
import { userActionTypes } from "../constants/userActionTypes";
const url = "https://signup-login-backend.herokuapp.com/users/tasks";

class Dummy extends Component {
    state = {
        tasks: [],
        isLoggedIn: true,
    }

    updateStatus(id) {
        fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ tasks: data.data });
            })
            .catch((err) => {
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
                this.setState({ tasks: [...data.data] })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    logout = () => {
        store.dispatch(userActionGenerator(userActionTypes.LOGOUT));
    }

    render() {
        return (
            <div className={styles["main-div"]}>
                <div>
                    <div>
                        <h1 className={styles["dummy-heading"]}>Let's start coding...!!</h1>
                    </div>
                    <div>
                        {
                            this.state.tasks.map((task) => {
                                return (
                                    <div key={task.taskId} className={styles["dummy-container"]}>
                                        <div>
                                            <p style={{
                                                textDecoration: task.status === "Complete" ?
                                                    (
                                                        "line-through"
                                                    ) :
                                                    (
                                                        ""
                                                    )
                                            }} className={styles["dummy-p"]}>{task.task}</p>
                                        </div>
                                        <div>
                                            <button onClick={() => this.updateStatus(task.taskId)} className={styles["complete-btn"]}>Complete</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles["btn-div"]}>
                     <button onClick={this.logout} className={styles["btn"]}>Logout</button>
                </div>
            </div>
        )
    }
}

export default Dummy;

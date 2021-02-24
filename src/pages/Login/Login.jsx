import React,{Component} from "react";
import TodoApp from "../TodoList/TodoApp/TodoApp";
import { Link } from "react-router-dom";
import  styles from "./Login.module.css";
import login from "./login.svg";
import Nav from "../../components/Navigation/Nav";
import Footer from "../../components/Footer/Footer";
import initFontAwesome from "../../components/initFontAwesome";
import store from "../../store/store";
import userActionGenerator from "../../actions/userActionGenerator";
import { userActionTypes } from "../../constants/userActionTypes";
import {connect} from "react-redux";
import LoginForm from "./LoginForm";

class Login extends Component{
    state= {
        username: "",
        password: "",
        successfullyLoggedIn: false,   
    }
    
    submitForm = (event) =>{
        event.preventDefault();
        store.dispatch(userActionGenerator(userActionTypes.LOGOUT));
        store.dispatch(userActionGenerator(userActionTypes.LOGIN, {
            username: event.target.username.value,
            password: event.target.password.value,
        }))
        this.clearInputField();
    }

    updateUsername = (event) =>{
        this.setState({username: event.target.value});
    }
    updatePassword = (event)=>{
        this.setState({password: event.target.value});
    }
    clearInputField = (event) =>{
        this.setState({password: "", username: ""});
    }

    render(){
        
        let user = localStorage.getItem("user");
        initFontAwesome();
        return(
            <div>
                <Nav/>
                {
                    user? 
                    (
                        <TodoApp/>
                    ):
                    (
                    <div className={styles["container"]}>
                    <div>
                        <h2 className={styles["welcome-msg"]}>Login to get started!!</h2>
                        <img src={login} alt = "" className={styles["logo"]}></img>
                    </div>
                    <LoginForm 
                        submit={this.submitForm} 
                        updateUsername={this.updateUsername}
                        updatePassword={this.updatePassword}
                        username={this.state.username}
                        password={this.state.password}
                    />
                    <div>
                        <p className={styles["additional-p"]}>Need an account? 
                            <Link to ="/register" className={styles["additional"]}>Register Now</Link>
                        </p>
                    </div>
                    </div>
                    )
                }
                    <Footer/>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        user: state.userReducer.user,
        isLoggedIn : state.userReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(Login);
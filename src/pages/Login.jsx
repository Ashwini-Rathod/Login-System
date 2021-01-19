import {Component} from "react";
import Dummy from "../pages/DummyData";
import { Link } from "react-router-dom";
import  styles from "./Login.module.css";
import login from "./login.svg";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import initFontAwesome from "../components/initFontAwesome";
import store from "../store/store";
import userActionGenerator from "../actions/userActionGenerator";
import { userActionTypes } from "../constants/userActionTypes";
import {connect} from "react-redux";

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
                        <Dummy/>
                    ):
                    (
                    <div className={styles["container"]}>
                    <div>
                        <h2 className={styles["welcome-msg"]}>Login to get started!!</h2>
                        <img src={login} alt = "" className={styles["logo"]}></img>
                    </div>
                    <form onSubmit= {this.submitForm} className={styles["form"]}>
                        <div className={styles["form-group"]}>
                        <label htmlFor= "username" className={styles["label"]}>username</label>
                        <input type = "username" name= "username" onChange={this.updateUsername} value={this.state.username} className={styles["input"]}></input>
                        </div>
                        <div className={styles["form-group"]}>
                        <label htmlFor = "password" className={styles["label"]}>Password</label>
                        <input type= "password" name= "password" onChange={this.updatePassword} value= {this.state.password} className={styles["input"]}></input>
                        </div>
                        <div >
                        <input type= "submit" value= "Login" className={styles["btn"]}></input>
                        </div>
                    </form>
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
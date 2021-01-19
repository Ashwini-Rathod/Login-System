import {Component} from "react";
import logo from "./register.svg";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import initFontAwesome from "../components/initFontAwesome";
import  styles from "./Login.module.css";
import store from "../store/store";
import { connect } from "react-redux";
import userActionGenerator from "../actions/userActionGenerator";
import { userActionTypes } from "../constants/userActionTypes";

class Register extends Component{
    state= {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    
    submitForm = (event) =>{
        event.preventDefault();
        store.dispatch(userActionGenerator(userActionTypes.REGISTER, {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
        }))
        this.clearInputField();
    }

    updateUserName = (event) =>{
        this.setState({username: event.target.value});
    }
    updateEmail = (event) =>{
        this.setState({email: event.target.value});
    }
    updatePassword = (event)=>{
        this.setState({password: event.target.value});
    }
    updateChangePassword = (event)=>{
        this.setState({confirmPassword: event.target.value});
    }
    clearInputField = (event) =>{
        this.setState({password: "", email: "", confirmPassword: "", username: ""});
    }

    render(){
        initFontAwesome();
        return(
            <div>
                <Nav/>
                <div className={styles["container"]}>
                    <div>
                        <h2 className="welcome-msg">Create account</h2>
                        <img src={logo} alt="" className={styles["logo"]}></img>
                    </div>
                    <form onSubmit= {this.submitForm} className={styles["form"]}>
                        <div className={styles["form-group"]}>
                            <label htmlFor= "username" className={styles["label"]}>Username</label>
                            <input type = "username" name="username" onChange={this.updateUserName} value={this.state.username} className={styles["input"]}></input>
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor= "email" className={styles["label"]}>Email</label>
                            <input type = "email" name= "email" onChange={this.updateEmail} value={this.state.email} className={styles["input"]}></input>
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor = "password" className={styles["label"]}>Password</label>
                            <input type= "password" name= "password" onChange={this.updatePassword} value= {this.state.password} className={styles["input"]}></input>
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor = "confirmPassword" className={styles["label"]}>Confirm Password</label>
                            <input type= "password" name= "confirmPassword" onChange={this.updateChangePassword} value= {this.state.confirmPassword} className={styles["input"]}></input>
                        </div>
                        <div>
                            <input type= "submit" value= "Register" className={styles["btn"]}></input>
                        </div>
                    </form>
                    <div>
                        <p className={styles["additional-p"]}>Already an user?  
                            <Link to="/login" className={styles["additional"]}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{     
        user: state.userReducer.user[0],
    }
}

export default connect(mapStateToProps)(Register);
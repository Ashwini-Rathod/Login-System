import React,{Component} from "react";
import logo from "./register.svg";
import { Link } from "react-router-dom";
import Nav from "../../components/Navigation/Nav";
import Footer from "../../components/Footer/Footer";
import initFontAwesome from "../../components/initFontAwesome";
import  styles from "../Login/Login.module.css";
import store from "../../store/store";
import { connect } from "react-redux";
import userActionGenerator from "../../actions/userActionGenerator";
import { userActionTypes } from "../../constants/userActionTypes";
import RegisterForm from "./RegisterForm";

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
                    <RegisterForm
                        submit={this.submitForm}
                        updateUserName = {this.updateUserName}
                        updateEmail = {this.updateEmail}
                        updatePassword = {this.updatePassword}
                        updateChangePassword ={this.updateChangePassword}
                        username={this.state.username}
                        email={this.state.email}
                        password={this.state.password}
                        confirmPassword={this.state.confirmPassword}
                    />
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
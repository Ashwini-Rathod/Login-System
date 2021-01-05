import {Component} from "react";
import logo from "./register.svg";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import initFontAwesome from "../components/initFontAwesome";
const url = "https://signup-login-backend.herokuapp.com/users/signin";

class Register extends Component{
    state= {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    
    submitForm = (event) =>{
        event.preventDefault();
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
                confirmPassword: event.target.confirmPassword.value,
            })
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            if(data.status === "Unsuccessful"){
                alert(data.message);
                this.clearInputField();
            }
            else{
                alert(`Welcome! You are now a part of CodersWorld Family. Please login to continue.`);
                this.props.history.push("/login");
                this.clearInputField();
            }
        })
        .catch((err)=>{
            console.log(err);
        })
        this.setState({username: event.target.username.value, password: event.target.password.value})
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
                <div className="container">
                    <div>
                        <h2 className="welcome-msg">Create account</h2>
                        <img src={logo} alt="" className="logo"></img>
                    </div>
                    <form onSubmit= {this.submitForm} className="form">
                        <div className="form-group">
                            <label htmlFor= "username" className="label">Username</label>
                            <input type = "username" name="username" onChange={this.updateUserName} value={this.state.username} className="input"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor= "email" className="label">Email</label>
                            <input type = "email" name= "email" onChange={this.updateEmail} value={this.state.email} className="input"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor = "password" className="label">Password</label>
                            <input type= "password" name= "password" onChange={this.updatePassword} value= {this.state.password} className="input"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor = "confirmPassword" className="label">Confirm Password</label>
                            <input type= "password" name= "confirmPassword" onChange={this.updateChangePassword} value= {this.state.confirmPassword} className="input"></input>
                        </div>
                        <div>
                            <input type= "submit" value= "Register" className="btn"></input>
                        </div>
                    </form>
                    <div>
                        <p className="additional-p">Already an user?  
                            <Link to="/login" className="additional">
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

export default Register;
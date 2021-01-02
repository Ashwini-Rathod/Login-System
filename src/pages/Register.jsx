import {Component} from "react";
import logo from "./register.svg";
const url = "http://localhost:5000/users/signin";
class Register extends Component{
    state= {
        email: "",
        password: "",
        confirmPassword: ""
    }
    
    submitForm = (event) =>{
        event.preventDefault();
        console.log("Form Submitted");
        console.log("email", event.target.email.value);
        console.log("password", event.target.password.value);
        console.log("confirmPassword", event.target.confirmPassword.value);
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value,
                confirmPassword: event.target.confirmPassword.value,
            })
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            if(data.status === "Unsuccessful"){
                alert(data.message);
                this.clearInputField();
            }
            else{
                alert("Successfully Registered");
                this.clearInputField();
            }
        })
        .catch((err)=>{
            console.log(err);
        })
        this.setState({email: event.target.email.value, password: event.target.password.value})
    }
    updateEmail = (event) =>{
        console.log(event.target.value);
        this.setState({email: event.target.value});
    }
    updatePassword = (event)=>{
        this.setState({password: event.target.value});
    }
    updateChangePassword = (event)=>{
        this.setState({confirmPassword: event.target.value});
    }
    clearInputField = (event) =>{
        this.setState({password: "", email: "", confirmPassword: ""});
    }
    render(){
        return(
            <div className="container">
                <div>
                    <h2>Create account</h2>
                    <img src={logo} alt="" className="logo"></img>
                </div>
                <form onSubmit= {this.submitForm} className="form">
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
            </div>
        )
    }
}

export default Register;
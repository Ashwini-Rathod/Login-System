import {Component} from "react";
import Cookies from "js-cookie";
import Dummy from "../pages/DummyData";
import { Link } from "react-router-dom";
import "./Login.css";
import login from "./login.svg";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import initFontAwesome from "../components/initFontAwesome";
const url = "https://signup-login-backend.herokuapp.com/users/login";

class Login extends Component{
    state= {
        username: "",
        password: "",
        successfullyLoggedIn: false,

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
                password: event.target.password.value,
            })
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            if(data.status === "Successful"){
                this.setState({successfullyLoggedIn: true});
                Cookies.set("jwt", data.data[0].jwt);
                this.clearInputField();
            }
            else{
                alert(data.message);
                this.clearInputField();
            }       
        })
        .catch((err)=>{
            console.log(err);
        })
        this.setState({username: event.target.username.value, password: event.target.password.value})
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
        initFontAwesome();
        return(
            <div>
                <Nav/>
                {
                    this.state.successfullyLoggedIn === true? 
                    (
                        <Dummy />
                    ):
                    (
                    <div className="container">
                    <div>
                        <h2 className="welcome-msg">Login to get started!!</h2>
                        <img src={login} alt = "" className="logo"></img>
                    </div>
                    <form onSubmit= {this.submitForm} className="form">
                        <div className="form-group">
                        <label htmlFor= "username" className="label">username</label>
                        <input type = "username" name= "username" onChange={this.updateUsername} value={this.state.username} className="input"></input>
                        </div>
                        <div className="form-group">
                        <label htmlFor = "password" className="label">Password</label>
                        <input type= "password" name= "password" onChange={this.updatePassword} value= {this.state.password} className="input"></input>
                        </div>
                        <div >
                        <input type= "submit" value= "Login" className="btn"></input>
                        </div>
                    </form>
                    <div>
                        <p className="additional-p">Need an account? 
                            <Link to ="/register" className="additional">Register Now</Link>
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

export default Login;
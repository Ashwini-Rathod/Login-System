import {Component} from "react";
import Cookies from "js-cookie";
import Dummy from "../pages/DummyData";
import "./Login.css";
import login from "./login.svg"
const url = "http://localhost:5000/users/login";
class Login extends Component{
    state= {
        email: "",
        password: "",
        successfullyLoggedIn: false,

    }
    
    submitForm = (event) =>{
        event.preventDefault();
        console.log("Form Submitted");
        console.log("email", event.target.email.value);
        console.log("password", event.target.password.value);
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value,
            })
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            if(data.status === "Successful"){
                this.setState({successfullyLoggedIn: true});
                this.setState({email: "", password: ""});
                Cookies.set("jwt", data.data[0].jwt);
                this.clearInputField();
            }
            else{
                alert(data.message);
            }
              
        })
        .catch((err)=>{
            console.log(err);
        })
        this.setState({email: event.target.email.value, password: event.target.password.value})
    }
    updateEmail = (event) =>{
        this.setState({email: event.target.value});
    }
    updatePassword = (event)=>{
        this.setState({password: event.target.value});
    }
    clearInputField = (event) =>{
        this.setState({password: "", email: ""});
    }
    render(){
        return(
            <div>
                {
                    this.state.successfullyLoggedIn === true? 
                    (
                        <Dummy />
                    ):
                    (
                    <div className="container">
                    <div>
                        <h2>Login</h2>
                        <img src={login} alt = "" className="logo"></img>
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
                        <div >
                        <input type= "submit" value= "Login" className="btn"></input>
                        </div>
                    </form>
                    {/* <div>
                        <button>Need an account? 
                            <Link to ="/register">Register Now</Link>
                        </button>
                    </div> */}
                    </div>
                    )
                }

            </div>
        )
    }
}


export default Login;

//create a backend data source for storing all logged in users.
//create a middleware which will check if the user is already logged in or not.
//if the user is logged in, display the necesarry message.
//if the user is not logged in, push the user into loggedin array and display necessary message.
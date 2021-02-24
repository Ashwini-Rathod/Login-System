import './App.css';
import React from "react";
import {Link} from "react-router-dom";
import image from "./Todo.svg"
import Nav from "./components/Navigation/Nav";
import Footer from "./components/Footer/Footer";
import initFontAwesome from "./components/initFontAwesome";

function App (){
  initFontAwesome();
  return(
    <div>
      <Nav/>
      <div data-testid="app-container" className = "app-container">
        <div className="app-intro">
        <h2 className="heading">What's your plan for the day?</h2>
        <p className="sub-heading">Plan your activities with us and make your day more productive!!</p>
        <img src= {image} alt = "" className="app-logo"></img>
        </div>
        <div>
          <div> 
        <Link to="/register"  >
            <button className= "create-btn">Create an account</button>
        </Link>
        </div>
        <div>
        <Link to="/login"  >
            <button className="login-btn">Login</button>
        </Link>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default App;

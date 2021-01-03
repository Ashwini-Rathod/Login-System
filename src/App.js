import './App.css';
import {Link} from "react-router-dom";
import image from "./coder.svg"
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import initFontAwesome from "./components/initFontAwesome";

function App (){
  initFontAwesome();
  return(
    <div>
      <Nav/>
      <div className = "app-container">
        <div className="app-intro">
        <h2 className="heading">Welcome to CodersWorld.com!</h2>
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

import React from "react";
import {Link} from "react-router-dom";
import "./Nav.css";
import store from "../../store/store";
import userActionGenerator from "../../actions/userActionGenerator";
import { userActionTypes } from "../../constants/userActionTypes";
import Cookies from "js-cookie";
// import icon from "./todo-icon.jpeg";

function Nav (){

    const logout = () => {
        store.dispatch(userActionGenerator(userActionTypes.LOGOUT));
        Cookies.remove("jwt");
    }
    // console.log(Cookies.get("jwt"));
    
    return(
        <nav className="nav-container"> 
        <div >
            {/* <img src={icon} alt="app-icon" className="icon"></img> */}
            <h2 className="title">TODO</h2>
        </div>
        {
            Cookies.get("jwt") ?  (
                <div>
                    <Link to="/login" className="home">
                        <p className="home-p" onClick={logout}>Logout</p>
                    </Link>
                </div>
            ) :
            (
                <div>
                <Link to="/" className="home">
                    <p className="home-p">Home</p>
                </Link>
                </div>
            )
        }

        </nav>
    )
}

export default Nav;
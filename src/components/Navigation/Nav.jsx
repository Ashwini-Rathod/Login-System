import React from "react";
import {Link} from "react-router-dom";
import styles from "./Nav.module.css";
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
        <nav className={styles["nav-container"]}> 
        <div >
            {/* <img src={icon} alt="app-icon" className="icon"></img> */}
            <h2 className={styles["title"]}>TODO</h2>
        </div>
        {
            localStorage.getItem("user") ?  (
                <div>
                    <Link to="/login" className={styles["home"]}>
                        <p className={styles["home-p"]} onClick={logout}>Logout</p>
                    </Link>
                </div>
            ) :
            (
                <div>
                <Link to="/" className={styles["home"]}>
                    <p className={styles["home-p"]}>Home</p>
                </Link>
                </div>
            )
        }

        </nav>
    )
}

export default Nav;
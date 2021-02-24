import React, {Component} from "react";
import Nav from "../../components/Navigation/Nav";
import Footer from "../../components/Footer/Footer";
import initFontAwesome from "../../components/initFontAwesome";
import Timer from "../../components/Timer/Timer"; 
import styles from "./Task.module.css";
import Today from "../../components/Today/Today";

class Task extends Component{ 
    render(){
        let {state} = this.props.location;
        console.log(state);
        initFontAwesome();
        return(
            <div>
            <Nav/>
              <div  className={styles["container"]}>
                <Today/>
                <div data-testid="task" className={styles["heading"]}>
                    <span className={styles["taskname"]}>{state.taskName}</span>
                    <h2 className={styles["started"]}>Let's get started!!</h2>
                </div>  
              <Timer/>
              </div>
            <Footer/>
            </div>
        )
    }
}

export default Task;
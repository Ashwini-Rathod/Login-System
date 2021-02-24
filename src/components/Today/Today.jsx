import React, {Component} from "react";
import styles from "./Today.module.css";

const newDate = new Date().toDateString().split(" ");


class Today extends Component{
    state={
        time: {
            date: newDate[2],
            day: newDate[0],
            month: newDate[1]
        },
    }
   render(){
       const {date, day, month} = this.state.time
    return (
        
        <div className={styles["container"]} >
            <span className={styles["day"]}>{`${day}, ${date}`}</span>
            <div>
            <span className={styles["month"]}>{month}</span>

            </div>
        </div>
    )
   }
}

export default Today;
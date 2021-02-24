import React,{Component} from "react";
import formattedSeconds from "./TimerDispaly";
import styles from "./Timer.module.css";

class Timer extends Component{
    state={
        running: false,
        secs: 0,
    }

    start = () =>{

        if(!this.state.running){
            this.setState({running: true});
            this.timerId = setInterval(()=>{
                this.setState({secs: this.state.secs+1})
            }, 1000)
        }
    }

    pause = () =>{
        if(this.state.running){
            clearInterval(this.timerId);
            this.setState({running: false});
        }
        else{
            this.start();
        }
    }

    reset = () =>{
        clearInterval(this.timerId);
        this.setState({secs: 0, running: false});
    }
    
    render(){
        return(
            <div className={styles["container"]}>
                <div>
                       <h1 className={styles["display"]}>{ formattedSeconds(this.state.secs)}</h1>
                    
                </div>
                <div>
                    <button className={styles["btn"]} onClick={this.start} >Start</button>
                    <button className={styles["btn"]} onClick={this.pause}>Pause</button>
                    <button className={styles["btn"]} onClick={this.reset}>Reset</button>
                </div>
            </div>
        )
    }
}

export default Timer;
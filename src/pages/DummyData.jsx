import { Component } from "react";
import Cookies from "js-cookie";
import "./Dummy.css";
const url = "https://signup-login-backend.herokuapp.com/users/tasks";

class Dummy extends Component{
    state={
        tasks: [], 
    }
    
    updateStatus(id) {
        fetch(`${url}/${id}`, {
            method : "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            this.setState({tasks: data.data});            
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    componentDidMount = () =>{
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${Cookies.get("jwt")}`,
            }
        })
        .then((response)=>{
            if(response.ok){
                return response.json();
            }
            return new Error("Invalid Login");
        })
        .then((data)=>{
            this.setState({tasks: [...data.data]})
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render(){
        return(
            <div className="main-div">
                <div>
                    <div>
                        <h1 className="dummy-heading">Let's start coding...!!</h1>
                    </div>
                    <div>
                    {
                        this.state.tasks.map((task)=>{
                            return(
                                <div key={task.taskId} className="dummy-container">
                                    <div>
                                    <p style={{
                                        textDecoration: task.status === "Complete"?
                                        (
                                            "line-through"
                                        ):
                                        (
                                            ""
                                        )
                                    }} className="dummy-p">{task.task}</p>
                                    </div>
                                    <div>
                                    <button onClick={()=> this.updateStatus(task.taskId)} className="complete-btn">Complete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default Dummy;

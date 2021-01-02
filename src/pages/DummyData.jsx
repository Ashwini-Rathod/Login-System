import { Component } from "react";
import Cookies from "js-cookie";
import "./Dummy.css";

const url = "http://localhost:5000/users/tasks";

class Dummy extends Component{
    state={
        tasks: [],
    }
    componentDidMount = () =>{
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${Cookies.get("jwt")}`,
            }
        })
        .then((response)=>{
            console.log(response);
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            this.setState({tasks: data.data})
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render(){
        return(
            <div className="dummy-body">
                <div className="dummy-container">
                    <div>
                        <h1>Courses to complete today</h1>
                    </div>
                    <div>
                    {
                        this.state.tasks.map((task)=>{
                            return(
                                <div>
                                    <p>{task.task}</p>
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

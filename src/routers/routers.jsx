import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../components/NotFound/NotFound";

class Router extends Component{
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/"exact component={App}/>
                        <Route 
                            path="/register"
                            render = {
                                (props) => {
                                    return <Register {...props}/>
                                }
                            }
                        />
                        <Route path="/login" exact component={Login}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>

            </div>
        )
    }
}

export default Router;
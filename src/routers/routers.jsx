import {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Nav from "../components/nav";
import Footer from "../components/Footer";
import initFontAwesome from "../components/initFontAwesome";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../components/NotFound";

class Router extends Component{
    render(){
        initFontAwesome();
        return(
            <div>
                <BrowserRouter>
                    <Nav/>
                    <Switch>
                        <Route path="/"exact component={App}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route component={NotFound}/>
                    </Switch>
                    <Footer/>
                </BrowserRouter>

            </div>
        )
    }
}

export default Router;
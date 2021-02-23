import {userActionTypes } from "../constants/userActionTypes";
import Cookies from "js-cookie";
const urlRegister = "https://todo-backend-user.herokuapp.com/users/signup";
const urlLogin = "https://todo-backend-user.herokuapp.com/users/login";

const userActionGenerator = (actionType, payload= {}) => {
    switch(actionType){
        case userActionTypes.REGISTER : 
            return (dispatch)=>{
                fetch(urlRegister, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: payload.username,
                        email: payload.email,
                        password: payload.password,
                        confirmPassword: payload.confirmPassword,
                    })
                })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    if(data.status === "Unsuccessful"){
                        dispatch({
                            type: userActionTypes.REGISTER,
                            payload: {
                                user: {},
                                isLoggedIn: false
                            }
                        })
                        alert(data.message);
                    }
                    else{
                        alert("Welcome to CodersWorld.com!! Please login to continue");
                        dispatch({
                            type: userActionTypes.REGISTER,
                            payload : {
                                user: {...data.data[0]},
                                isLoggedIn: false,
                            }
                        })
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        case userActionTypes.LOGIN : 
            return (dispatch)=>{
                fetch(urlLogin, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: payload.username,
                        password: payload.password,
                    })
                })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    // console.log("From redux: ",data.data[0]);
                    if(data.status === "Unsuccessful"){
                       alert(data.message);
                       return;
                    }
                    Cookies.set("jwt", data.data[0][0].jwt);
                    localStorage.setItem("user", JSON.stringify(data.data[0]));
                    dispatch({
                        type: userActionTypes.LOGIN,
                        payload : {
                            user: {...data.data[0]},
                            isLoggedIn : true,
                        }   
                    })
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        case userActionTypes.LOGOUT : 
            localStorage.removeItem("user") 
            return (dispatch)=>{
                dispatch({
                    type: userActionTypes.LOGOUT,
                    payload: {}
                })
            }
        default :
            return ("Invalid Action");
    }
}

export default userActionGenerator;
import {userActionTypes } from "../constants/userActionTypes";
import Cookies from "js-cookie";
const urlRegister = "https://signup-login-backend.herokuapp.com/users/signin";
const urlLogin = "https://signup-login-backend.herokuapp.com/users/login";

const userActionGenerator = (actionType, payload= {}) => {
    switch(actionType){
        case userActionTypes.REGISTER : 
            console.log("Payload: ",payload);
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
                    // console.log(data);
                    dispatch({
                        type: userActionTypes.REGISTER,
                        payload : {
                            user: {...data.data[0]},
                            isLoggedIn: false,
                        }
                    })
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
                    // console.log(data);
                    // console.log(data.data[0])
                    if(data.status === "Successful"){
                        Cookies.set("jwt", data.data[0].jwt);
                        localStorage.setItem("user", JSON.stringify(data.data[0]));
                        dispatch({
                            type: userActionTypes.LOGIN,
                            payload : {
                                user: {...data.data[0]},
                                isLoggedIn : true,
                            }   
                        })
                    }
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
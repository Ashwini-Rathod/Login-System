import {userActionTypes} from "../constants/userActionTypes";

const initialState = {
    user: {},
    isLoggedIn: false,
}

// let user = JSON.parse(localStorage.getItem('user'));
// console.log("User from local storage: ",user);
// const initialState = user ? { isLoggedIn: true, user } : {isLoggedIn: false, user=[]};


const userReducer = (state=initialState, action) =>{
    switch(action.type){
        case userActionTypes.REGISTER :
            return {
                ...state,
                user: {...action.payload.user},
                isLoggedIn: action.payload.isLoggedIn,
            }
        case userActionTypes.LOGIN : 
            // console.log("Payload", action.payload);
            return {
                ...state,
                user: {...action.payload.user},
                isLoggedIn: action.payload.isLoggedIn
            }
        case userActionTypes.LOGOUT : 
            return {
                ...state,
                user: [],
                isLoggedIn: false,
            }
        default :
            return { ...state }
        }
}

export default userReducer;
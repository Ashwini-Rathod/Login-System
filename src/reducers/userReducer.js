import {userActionTypes} from "../constants/userActionTypes";

const initialState = {
    user: {},
    isLoggedIn: false,
}

const userReducer = (state=initialState, action) =>{
    switch(action.type){
        case userActionTypes.REGISTER :
            return {
                ...state,
                user: {...action.payload.user},
                isLoggedIn: action.payload.isLoggedIn,
            }
        case userActionTypes.LOGIN : 
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
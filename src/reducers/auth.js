/* eslint-disable import/no-anonymous-default-export */
import {LOGIN_SUCCESS,LOGIN_FAIL,USER_LOADED} from "../actions/constants";


const initalState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

export default function(state=initalState,action) {
    const {type,payload} = action

    

    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            localStorage.setItem('user',JSON.stringify(payload.data))
            console.log("login___________________",payload.data)
            if(payload.msg === "Authentication success" && payload.data !== null){
                return{
                    user:payload.data,
                    isAuthenticated:true,
                    loading:false
                }
            }
            // else{
            //     return{
            //         isAuthenticated:false,
            //         loading:false
            //     }
            // }
            
        case USER_LOADED:
            if(localStorage.user) {
                let user = JSON.parse(localStorage.getItem("user"))
                return{
                    ...state,
                    isAuthenticated:true,
                    loading:false,
                    user
                } 
            }else {
                return {
                    ...state,
                    isAuthenticated:false,
                    loading:false
                }
            }
               
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return{
                user:null,
                token:null,
                isAuthenticated:false,
                loading:false
            }    
        default:
            return state;    
    }
}
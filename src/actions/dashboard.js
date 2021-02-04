import {DASHBOARD_DETAILS,DASHBOARD_ORDER_DETAILS,DASHBOARD_USER_DETAILS,GET_DASHBOARD_DELIVERY} from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";

// Dashboard details
export const dashboardDetails = () => async dispatch => {
    try {
        const res = await axios.get(`${apiurl}getDashboardDetails`)

        dispatch({
            type:DASHBOARD_DETAILS,
            payload:res.data.data
        })

    } catch (err) {
            console.error(err)
    }
}


// Dashboard order count
export const dashboardOrderDetails = () => async dispatch => {
    try {
        const res = await axios.get(`${apiurl}getDashboardOrderDetails`)

        dispatch({type:DASHBOARD_ORDER_DETAILS,payload:res.data.data})
    } catch (err) {
        
    }
}


// Dashboard user count
export const getDashboardUserDetails = () => async dispatch => {
    try {
        const res = await axios.get(`${apiurl}getDashboardUserDetails`)
        dispatch({type:DASHBOARD_USER_DETAILS,payload:res.data.data})
    } catch (err) {
        
    }
}

export const getDashboardDelivery = () => async dispatch => {
    try {
        const res = await axios.get(`${apiurl}getDashboardReadyForDeliveryDetails`)
        dispatch({type:GET_DASHBOARD_DELIVERY,payload:res.data.data})
    } catch (err) {
        
    }
}
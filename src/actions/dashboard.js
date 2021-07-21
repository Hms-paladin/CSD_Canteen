import { DASHBOARD_DETAILS, DASHBOARD_ORDER_DETAILS, DASHBOARD_USER_DETAILS, GET_DASHBOARD_DELIVERY, GET_DASHBOARD_DETAILS } from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";
import dateformat from "dateformat";

// Dashboard detailss
export const dashboardDetails = () => async dispatch => {
    try {
        const res = await axios.get(`${apiurl}getDashboardDetails`)

        dispatch({
            type: DASHBOARD_DETAILS,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
    }
}


// Dashboard order count
export const dashboardOrderDetails = () => async dispatch => {
    try {
        const res = await axios.get(`${apiurl}getDashboardOrderDetails`)

        dispatch({ type: DASHBOARD_ORDER_DETAILS, payload: res.data.data })
    } catch (err) {

    }
}


// Dashboard user count
export const getDashboardUserDetails = () => async dispatch => {
    try {
        const res = await axios.get(`${apiurl}getDashboardUserDetails`)
        dispatch({ type: DASHBOARD_USER_DETAILS, payload: res.data.data })
    } catch (err) {

    }
}

export const getDashboardDelivery = () => async dispatch => {
    try {
        const res = await axios.get(`${apiurl}getDashboardReadyForDeliveryDetails`)
        dispatch({ type: GET_DASHBOARD_DELIVERY, payload: res.data.data })
    } catch (err) {

    }
}
// export const getDashboardDelivery = () => async dispatch => {
//     try {
//         const res = await axios.get(`${apiurl}getDashboardReadyForDeliveryDetails`)
//         dispatch({ type: GET_DASHBOARD_DELIVERY, payload: res.data.data })
//     } catch (err) {

//     }
// }
export const GetDashboardDetails = (params) => async dispatch => {
    try {
        console.log(params.startDate,params.startDate.length,"kkkkkkkkk")
        axios({
            method: 'POST',
            url: apiurl + 'getDashboardDetails',
            data: {
                
                "fromDate": params.startDate,
                "toDate": params.endDate
            }
        }).then((response) => {
            if (response.data.status === 1) {
                // alert("sucess")
                dispatch({ type: GET_DASHBOARD_DETAILS, payload: response.data.data })
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}
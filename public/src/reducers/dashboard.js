/* eslint-disable import/no-anonymous-default-export */
import {DASHBOARD_DETAILS,DASHBOARD_ORDER_DETAILS,DASHBOARD_USER_DETAILS,GET_DASHBOARD_DELIVERY} from "../actions/constants";

const initalState = {
    dashboardCount:null,
    orderDetails:null,
    userCount:null,
    dashboardDelivery:null
}


export default function(state=initalState,action) {
    const {type,payload} = action;
    switch(type) {
        case DASHBOARD_DETAILS:
            return {...state,dashboardCount:payload};
        case DASHBOARD_ORDER_DETAILS:
            return {
                ...state,
                orderDetails:payload
            } 
        case DASHBOARD_USER_DETAILS:
            return {
                ...state,
                userCount:payload
            }  
        case GET_DASHBOARD_DELIVERY:
            let dashboardDelivery = [];
            payload && payload.length > 0 && payload.map((data) => {
                const {orderDate,orderId,cardNumber,userName,orderTotalAmount} = data;
                dashboardDelivery.push({
                    orderDate,
                    orderId,
                    cardNumber,
                    userName,
                    orderTotalAmount,
                    id:orderId
                })
            })
            return {...state,dashboardDelivery}
        default:
            return state    
    }
}
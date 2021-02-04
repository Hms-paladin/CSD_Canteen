/* eslint-disable import/no-anonymous-default-export */
import {GET_ORDERS} from "../actions/constants";


const initalState = {
    orders:null,
    allDetails:null,
}

export default function(state=initalState,action) {
    const {type,payload} = action;
    switch(type) {
        case GET_ORDERS:
            let orders = [];
            payload && payload.length > 0 && payload.map((data) => {
                const {orderId,orderDate,cardNumber,userName,orderTotalAmount} = data;
                orders.push({
                    orderId,
                    orderDate,
                    cardNumber,
                    userName,
                    orderTotalAmount,
                    id:orderId
                })
            })
            return {
                ...state,
                orders,
                allDetails:payload
            }
        default:
            return state    
    }
}
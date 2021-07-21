/* eslint-disable import/no-anonymous-default-export */
import {GET_ORDERS} from "../actions/constants";
import moment from 'moment';


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
                    orderDate:moment(orderDate).format("DD-MM-yyyy"),
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
/* eslint-disable import/no-anonymous-default-export */
import {GET_PICKLIST_DATA} from "../actions/constants";
import dateformat from "dateformat";

const initalState = {
    picklistdata:null,list_details:[]
}

export default function(state=initalState,action) {
    const {type,payload} = action;

    switch(type) {
        case GET_PICKLIST_DATA:
            let picklistdata = [];
            payload && payload.length > 0 && payload.map((data) => {
                const {orderDate} = data;
                picklistdata.push({
                orderDate:dateformat(orderDate,"dd/mm/yyyy"),
                numberoforder:data.orderDetails.length,
                id: data.orderId
            })
            })
            return {...state,list_details:payload,picklistdata}
        default:
            return state;
    }
}
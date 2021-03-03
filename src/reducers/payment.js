import {GET_PAYMENT_DETAILS} from "../actions/constants";
import dateformat from "dateformat";

const initalState = {
    paymentdata:null
}

export default function(state=initalState,action) {
    const {type,payload} = action;

    switch(type) {
        case GET_PAYMENT_DETAILS:
            let paymentdata = [];
            payload && payload.length > 0 && payload.map((data) => {
                paymentdata.push({
                    orderid: data.orderid ||"6574547ADSS",
                orderamount : data.orderamount||"4000",
                Name:data.Name|| "Jeevan",
                BankName:data.BankName || "DBS Bank",
                TransactionId:data.TransactionId||"132456743",
                id:1,
            })
            })
            return {...state,paymentdata}
        default:
            return state;
    }
}
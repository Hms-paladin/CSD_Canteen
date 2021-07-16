import {GET_PAYMENT_DETAILS} from "../actions/constants";
import dateformat from "dateformat";
import moment from 'moment'

const initalState = {
    paymentdata:null
}

export default function(state=initalState,action) {
    const {type,payload} = action;

    switch(type) {
        case GET_PAYMENT_DETAILS:
            let paymentdata = [];
            console.log(payload,"payload")
            payload && payload.length > 0 && payload.map((data) => {
                console.log(payload,"payload")
                    paymentdata.push({
                        
                        orderid: data.orderId,
                        date:moment(data.orderDate).format("DD-MM-yyyy"),
                        orderamount : data.orderAmount,
                        name:data.user_name,
                       // bankname:data.bankName,
                        transactionid:data.paymentId,
                        id:1
                
            })
            })
            console.log(paymentdata,"ppppppppppppp")
            return {...state,paymentdata}
        default:
            return state;
    }
}
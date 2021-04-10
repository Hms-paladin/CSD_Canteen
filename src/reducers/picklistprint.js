/* eslint-disable import/no-anonymous-default-export */
import { GET_PICKLIST_DATA } from "../actions/constants";
import dateformat from "dateformat";

const initalState = {
    picklistdata: null, list_details: []
}

export default function (state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PICKLIST_DATA:
            let picklistdata = [];
            let pickListDate = []
            payload.length > 0 && payload.map((data) => {
                const { orderDate } = data;
                console.log(pickListDate.includes(dateformat(orderDate, "dd/mm/yyyy")),"adddate")
                if (!pickListDate.includes(dateformat(orderDate, "dd/mm/yyyy"))) {
                    picklistdata.push({
                        orderDate: dateformat(orderDate, "dd/mm/yyyy"),
                        numberoforder: 1,
                        // data.orderDetails.length
                        id: data.orderId
                    })
                    pickListDate.push(dateformat(orderDate, "dd/mm/yyyy"))
                }
                else{
                    
                    let getIndex = []

                    pickListDate.filter((da,index)=>{
                        console.log(dateformat(orderDate, "dd/mm/yyyy"),(da),"hai")
                        if(dateformat(orderDate, "dd/mm/yyyy") === da){
                            getIndex.push(index)
                        }
                    })
                    picklistdata[getIndex[0]].numberoforder = picklistdata[getIndex[0]].numberoforder + 1
                }
            })
            return { ...state, list_details: payload, picklistdata }
        default:
            return state;
    }
}
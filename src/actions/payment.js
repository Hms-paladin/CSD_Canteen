import {GET_PAYMENT_DETAILS} from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";
import dateformat from "dateformat";

export const getPaymentListData = () => async dispatch => {
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const body = {      
                dateRange:false,
                fromDate:"2020-11-11",
                toDate:dateformat(new Date(), "yyyy-mm-dd"),
                limit:5,
                pageno:1
        }

        const url = `${apiurl}getPaymentListWeb`
        const res = await axios.post(url,body,config)

        dispatch({type:GET_PAYMENT_DETAILS,payload:res.data.data})
    } catch (err) {
        
    }
}
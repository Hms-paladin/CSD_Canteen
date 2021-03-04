import {GET_ORDERS} from "./constants";
import apiurl from "../utils/baseUrl";
import axios from "axios";
import dateformat from "dateformat";


export const getOrdersList = (data) => async dispatch => {
    try {

        const {startDate,endDate} = data;

        const url = `${apiurl}getOrderListWeb`;

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const body = {
            "dateRange":true,
            "fromDate": dateformat(startDate,"yyyy-mm-dd"),
            "toDate": dateformat(endDate,"yyyy-mm-dd"),
            "limit": 100,
            "pageno":1
        }

        const res = await axios.post(url,body,config)

        dispatch({type:GET_ORDERS,payload:res.data.data[0].details})
        
    } catch (err) {
        
    }
}
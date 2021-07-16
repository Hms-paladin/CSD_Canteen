import { GET_PAYMENT_DETAILS } from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";
import dateformat from "dateformat";

export const getPaymentListData = (data) => async dispatch => {
    try {
        // alert("hiiiiii")
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        console.log(data.startDate,data.endDate,"check")

        const body = {
            dateRange: true,
            fromDate: data?dateformat(data.startDate, "yyyy-mm-dd"): dateformat(new Date(), "yyyy-mm-dd"),
            toDate: data?dateformat(data.endDate, "yyyy-mm-dd"): dateformat(new Date(), "yyyy-mm-dd"),
            // fromDate: "2021-03-20",
            // toDate: "2021-03-21",
            limit: 100000,
            pageno: 1
        }




        console.log(body, "checkbody")
        const url = `${apiurl}getPaymentListWeb`
        const res = await axios.post(url, body, config)

        dispatch({ type: GET_PAYMENT_DETAILS, payload: res.data.data[0].details})
    } catch (err) {

    }
}
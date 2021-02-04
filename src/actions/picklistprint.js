import {GET_PICKLIST_DATA} from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";
import dateformat from "dateformat";

export const getPrintListData = () => async dispatch => {
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const body = {
            // date: dateformat(new Date(), "yyyy-mm-dd")
            date:"2020-11-30"
        }

        const url = `${apiurl}getPickListDetailsWeb`
        const res = await axios.post(url,body,config)

        dispatch({type:GET_PICKLIST_DATA,payload:res.data.data})
    } catch (err) {
        
    }
}
import {NEW_ARRIVAL} from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";


export const getNewArrivals = () => async dispatch =>{
    try {
        
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const url = `${apiurl}getNewArraivalListWeb`;

        const body = {
            "categoryId":1,
            "subCategoryId":1,
            "limit":5,
            "pageno":1
        }

        const res = await axios.post(url,body,config)
        dispatch({type:NEW_ARRIVAL,payload:res.data.data[0].details})
        
    } catch (err) {
        
    }
}
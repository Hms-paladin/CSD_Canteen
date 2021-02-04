import {GET_PAGES_DETAILS} from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";

export const getPageDetails = () => async dispatch => {
    try {
        const url = `${apiurl}getPageDetailsWeb`;
        const res = await axios.get(url)
        dispatch({type:GET_PAGES_DETAILS,payload:res.data.data}) 
    } catch (err) {
        console.error(err)
    }
}


export const editPageDetails = ( pageContentId,pageDetails) => async dispatch => {
   
    try {
       
        const url = `${apiurl}updatePageDetailsWeb`;
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body = {
            pageDetails,
            pageContentId
        }

        const res = await axios.put(url,body,config)
    } catch (err) {
        console.error("sadfjksadhfj",err)
    }
}
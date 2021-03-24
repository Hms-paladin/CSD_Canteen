import { NEW_ARRIVAL, GET_CATEGORY, GET_SUBCATEGORY } from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";


export const getNewArrivals = () => async dispatch => {
    try {
        const config = {headers: {"Content-Type": "application/json"}}
        const url = `${apiurl}getNewArraivalListWeb`;
        const body = {
            "categoryId": 1,
            "subCategoryId": 1,
            "limit": 5,
            "pageno": 1
        }
        const res = await axios.post(url, body, config)
        dispatch({ type: NEW_ARRIVAL, payload: res.data.data[0].details })

    } catch (err) {

    }
}

export const getCategory = () => async dispatch => {
    const config = {headers: {"Content-Type": "application/json"}}
    const url = `${apiurl}getCategoryList/:false`;
    const res = await axios.get(url, config)
    dispatch({ type: GET_CATEGORY, payload: res.data.data })
}

export const getSubCategory = () => async dispatch => {
    const config = {headers: {"Content-Type": "application/json"}}
    const url = `${apiurl}getCategoryWithSubCategoryList/:false`;
    const res = await axios.get(url, config)
    dispatch({ type: GET_SUBCATEGORY, payload: res.data.data })
}
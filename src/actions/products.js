import {GET_PRODUCTS} from "./constants";
import apiurl from "../utils/baseUrl";
import axios from "axios";

export const getProductDetails = () => async dispatch => {
    try {

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const url = `${apiurl}getProductListWeb`;
        const body = {
            "limit":1000000,
            "pageno":1
        }
        const res = await axios.post(url,body,config);
        dispatch({type:GET_PRODUCTS,payload:res.data.data[0].details})
        console.log("sadfjsdflhsdflsadf",res.data.data[0].details)
    } catch (err) {
        console.error(err)
    }
}

export const editProduct = (productId,imageArray,productSub) => async dispatch => {
    try {
        let formData = new FormData();
      
        formData.set('productId',productId)
        formData.append('imageArray',imageArray)
        formData.set("subcategoryId",productSub)

        const url = `${apiurl}editProduct`
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        console.log("sadfljhasdjfhasdjf",formData)
        await axios.put(url,formData,config)
        dispatch(getProductDetails())
    } catch (err) {
        
    }
}

export const getSubCategory = (id) => async dispatch => {
    try {

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const url = `${apiurl}getSubCategory`;
        const body = {
            "product_category_id":id
            
        }
        const res = await axios.post(url,body,config);
        dispatch({type:"Get_Sub_Category",payload:res.data.data})
        console.log("sadfjsdflhsdflsadf",res.data.data)
    } catch (err) {
        console.error(err)
    }
}
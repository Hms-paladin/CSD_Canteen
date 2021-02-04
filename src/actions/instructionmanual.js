import {GET_INSTRUCTION_DATA,GET_INSTRUCTION_LANGUAGE} from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";


export const getInstructionData = () => async dispatch => {
    try {
            const res = await axios.get(`${apiurl}getInstructionManualDetailsWeb`)
            console.log("asfdjasdhflasdf",res.data.data)
            dispatch({type:GET_INSTRUCTION_DATA,payload:res.data.data})
    } catch (err) {
        
    }
}

export const getInstructionLanguage = () => async dispatch => {
    try {
         const res = await axios.get(`${apiurl}getInstructionManualLanguageWeb`)
         dispatch({type:GET_INSTRUCTION_LANGUAGE,payload:res.data.data})
    } catch (err) {
        
    }
}


export const updateInstruction = (instructionId,imageArray) => async dispatch => {
    try {
        var formData = new FormData();
      
        formData.set('instructionId',instructionId)
        formData.append('imageArray',imageArray)

        const url = `${apiurl}updateInstructionManual`
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        console.log("sadfljhasdjfhasdjf",formData)
        await axios.put(url,formData,config)
        dispatch(getInstructionData())
        
    } catch (err) {
        
    }
}
/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import {GET_INSTRUCTION_DATA,GET_INSTRUCTION_LANGUAGE} from "../actions/constants";
import dateformat from "dateformat";

const initalState = {
    instructionData:null,
    instructionLanguage:null
}

export default function(state=initalState,action) {
    const {type,payload} = action;
    switch(type) {
        case GET_INSTRUCTION_DATA:
            let instructionData = [];
            payload && payload.length > 0 && payload.map((data) => {
                const {instructionLanguage,instructionFileName,instructionLastUpdateOn,instructionId,instructionFileURL} = data;
                instructionData.push({
                    instructionLanguage,
                    instructionFileName,
                    instructionLastUpdateOn:dateformat(instructionLastUpdateOn,"dd mmm yyyy"),
                    id:instructionId,pdfURL:instructionFileURL
                })
            })
            return {...state,instructionData}
        case GET_INSTRUCTION_LANGUAGE:
            return{...state,instructionLanguage:payload}    
        default:
            return state;
    }
}
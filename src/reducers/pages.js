/* eslint-disable import/no-anonymous-default-export */
import {GET_PAGES_DETAILS} from "../actions/constants"

const initalState = {
    pageDetails:{}
}

export default function(state=initalState,action) {
    const {type,payload} = action;
    switch(type) {
        case GET_PAGES_DETAILS:
            return {pageDetails:payload}
        default:
            return state;    
    }
}
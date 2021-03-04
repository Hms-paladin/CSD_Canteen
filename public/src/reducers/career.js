/* eslint-disable import/no-anonymous-default-export */
import {CAREER_DETAILS} from "../actions/constants";
import dateformat from "dateformat";



export default function(state=[],action) {
    const {type,payload} = action;
    switch(type) {
        case CAREER_DETAILS:
            let careeres = [];
            payload && payload.length > 0 && payload.map((data) => {
                careeres.push({
                    careerTitle:data.careerTitle,
                    careerLocation:data.careerLocation,
                    careerDate: dateformat(data.careerDate,"dd mmm yyyy"),
                    careerMailId:data.careerMailId,
                    id:data.careerId
                })
            })
            return {careeres,payload};
        default:
            return state;    
    }
}
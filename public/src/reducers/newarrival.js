/* eslint-disable no-fallthrough */
import {NEW_ARRIVAL} from "../actions/constants";


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=[],action) {
    const {type,payload} = action;
    switch(type) {
        case NEW_ARRIVAL:
            let newarrivals = [];
            payload && payload.length > 0 && payload.map((data) => {
                const {indexNumber,categoryName,subCategoryName,productName,productId} = data;
                newarrivals.push({
                    indexNumber,
                    categoryName,
                    subCategoryName,
                    productName,
                    id:productId
                })
            })
        return {newarrivals,payload};

        default:
            return state;
    }
}
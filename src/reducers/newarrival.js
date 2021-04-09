/* eslint-disable no-fallthrough */
import { NEW_ARRIVAL, GET_SUBCATEGORY, GET_CATEGORY } from "../actions/constants";

const initialState = {
    newarrivals: [],
    payload: [],
    getSubCategory: [],
    getCategory: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case NEW_ARRIVAL:
            // let newarrivals = [];
            // payload && payload.length > 0 && payload.map((data) => {
            //     const { indexNumber, categoryName, subCategoryName, productName, productId } = data;
            //     newarrivals.push({
            //         indexNumber,
            //         // categoryName,
            //         // subCategoryName,
            //         productName,
            //         id: productId
            //     })
            // })
            return { ...state, newarrivals: payload };

        case GET_SUBCATEGORY:
            return { ...state, getSubCategory:payload }

        case GET_CATEGORY:
            return { ...state, getCategory:payload }

        default:
            return state;
    }
}
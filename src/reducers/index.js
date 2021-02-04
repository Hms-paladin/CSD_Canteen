import {combineReducers} from "redux";
import auth from "./auth";
import dashboard from "./dashboard";
import career from "./career";
import newarrival from "./newarrival";
import pages from "./pages";
import orders from "./orders";
import products from "./products";
import instructionmanual from "./instructionmanual";
import picklistprint from "./picklistprint";

export default combineReducers({
        auth,
        dashboard,
        career,
        newarrival,
        pages,
        orders,
        products,
        instructionmanual,
        picklistprint
})


import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED } from "./constants";
import apiurl from "../utils/baseUrl";
import axios from "axios";
import {notification} from "antd";



// Loaduser
export const loadUser = () => {
    const action = {
        type: USER_LOADED
    }

    return action;
}

// Login
export const login = ({ email, password }, history) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ email, password })
    try {

        const res = await axios.post(`${apiurl}adminLogin`, body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { data: res.data.data, token: res.data.token }
        })
        dispatch(loadUser())
        history.push("/dashboard")
    } catch (err) {
        console.error(err)
        notification.error({
            message: 'Email and Password does not match our records',
          });
    }
}

// logout
export const logout = () => {
    const action = {
        type: LOGIN_FAIL
    }

    return action;
}
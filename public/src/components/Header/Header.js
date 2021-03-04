import React from "react";
import "./Header.css";
import {logout} from "../../actions/auth";
import {useDispatch} from "react-redux";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const Header = () => {

    const dispatch = useDispatch();

    const logout = () =>{
        localStorage.clear()
        history.push("/")
        history.go()
    }
    
    return(
        <div className="canteen_header">
            <div className="canteen_header-title">
                CSD Canteens Chennai
            </div>
            {/* <div>
                <input type="text" placeholder="Search" className="canteen_header-search" />
            </div> */}
            <div onClick={logout}>
                Logout
            </div>
            
        </div>
    )
}


export default Header;
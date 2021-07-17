import React from "react";
import {Link,NavLink,useHistory} from "react-router-dom";
import "./Sidebar.css";


const Sidebar = () => {
    return(
        <div className="sidebar"> 
            <ul>
               <li> <NavLink  className="link-bef" activeClassName="active-link" to="/dashboard">Dashboard</NavLink></li>
               <li><NavLink className="link-bef" activeClassName="active-link" to="/orders">Orders</NavLink></li>
               <li><NavLink className="link-bef" activeClassName="active-link" to="/picklist">Pick List</NavLink></li>
               <li><NavLink className="link-bef" activeClassName="active-link" to="/payment">Payment Details</NavLink></li>
               <li><NavLink className="link-bef" activeClassName="active-link"  to="/inventory">Data Upload</NavLink></li>
               <li><NavLink className="link-bef" activeClassName="active-link" to="/productmanagement">Product</NavLink></li>
                <li> <NavLink className="link-bef" activeClassName="active-link" to="/newarrival">New Arrival</NavLink></li>
                <li> <NavLink className="link-bef" activeClassName="active-link"  to="/pages">Pages</NavLink></li>
                <li>    <NavLink className="link-bef" activeClassName="active-link" to="/career">Career</NavLink></li>
                <li>  <NavLink className="link-bef" activeClassName="active-link" to="/instructionmanual">Instruction Manual</NavLink></li>
                </ul>
           
        </div>
    )
}

export default Sidebar;
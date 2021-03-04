import React from "react";
import {Link,useHistory} from "react-router-dom";
import "./Sidebar.css";


const Sidebar = () => {

    const history = useHistory();
    if(window.location.pathname === "/"){
    history.push("/dashboard")
    }
    return(
        <div className="sidebar"> 
            <ul>
                <li>
                <Link to="/dashboard">Dashboard</Link>
                </li> 

                <li>
                <Link to="/orders">Orders</Link>
                </li>
       
               <li>
                <Link to="/picklist">Pick List Print</Link>
                </li>

                <li>
                <Link to="/payment">Payment Details</Link>
           
               </li>

               <li>
                <Link to="/inventory">Inventory Upload</Link>
                </li>

              <li>
                <Link to="/productmanagement">Product</Link>
                </li>

                <li>
                <Link to="/newarrival">New Arrival</Link>
               </li>

                <li>
                    <Link to="/pages">Pages</Link>
                </li>

                <li>
                    <Link to="/career">Career</Link>
                </li>

                <li>
                    <Link to="/instructionmanual">Instruction Manual</Link>
                </li>

             
                </ul>
           
        </div>
    )
}

export default Sidebar;
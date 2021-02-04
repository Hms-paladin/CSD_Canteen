import React,{useState,useEffect} from "react";
import "./CardComp.css";

import {useDispatch,useSelector,connect} from "react-redux";
import {dashboardDetails} from "../../actions/dashboard";


const CardComp = ({ dashboardCount,changeDetails }) => {

    console.log("cardcomp",dashboardCount && dashboardCount[0])

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(dashboardDetails())
    },[dispatch])

   



    return(
        <>

         <div className={`card card-clr-0`} onClick={() => changeDetails(1)}>
                    <p className="card-clr-text">{dashboardCount && dashboardCount[0].orderCount} Total Orders</p>
                    <div className="card-line"></div>
                    <div className="card-sec-half">
                    <div className="card-clr-text">View Details</div>
                    <div className="card-arrow"> > </div>
                    </div>
        </div>

        <div className={`card card-clr-1`} onClick={() => changeDetails(2)}>
                    <p className="card-clr-text">{dashboardCount && dashboardCount[0].readyForDeliveryCount} Ready For Delivery</p>
                    <div className="card-line"></div>
                    <div className="card-sec-half">
                    <div className="card-clr-text">View Details</div>
                    <div className="card-arrow"> > </div>
                    </div>
        </div>

        <div className={`card card-clr-2`} onClick={() => changeDetails(3)}>
                    <p className="card-clr-text">{dashboardCount && dashboardCount[0].userCount} Total Users</p>
                    <div className="card-line"></div>
                    <div className="card-sec-half">
                    <div className="card-clr-text">View Details</div>
                    <div className="card-arrow"> > </div>
                    </div>
        </div>
       
        </>
    )
}

const mapStateToProps = state => ({
    dashboardCount:state.dashboard.dashboardCount
})


export default connect(mapStateToProps)(CardComp);
import React,{useEffect,useState} from "react";
import TableHeader from "../tableHeader/TableHeader";
import CardComp from "../cardComp/CardComp";

import {useDispatch,useSelector,connect} from "react-redux";
import {dashboardOrderDetails,getDashboardUserDetails,getDashboardDelivery} from "../../actions/dashboard";
import ReadyForDeliveryTable from "./ReadyForDeliveryTable";



const Dashboard = ({ orderCount,userCount,dashboardDelivery }) => {

    const [firstDetail,setFirstDetail] = useState(true)
    const [secondDetail,setSecondDetail] = useState(false)
    const [thirdDetail,setThirdDetail] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        // if(){

        // }
        dispatch(dashboardOrderDetails())
        dispatch(getDashboardUserDetails())
        dispatch(getDashboardDelivery())
    },[dispatch])
   

    const changeDetails = (cno) => {
        if(cno === 1) {
            setFirstDetail(true)
            setSecondDetail(false)
            setThirdDetail(false)
        }

        if(cno === 2) {
            setSecondDetail(true)
            setFirstDetail(false)
            setThirdDetail(false)
        }

        if(cno === 3) {
            setThirdDetail(true)
            setSecondDetail(false)
            setFirstDetail(false)
        }
    }

    return(
        <div className="main-content">
        <TableHeader title="Dashboard" />

        <div className="main-content-details">
            <div className="card-details">
             <CardComp changeDetails={changeDetails} />
            </div>
            <div className="orders">
                <div>
                <div>
                   {firstDetail && <h3>Orders By Category</h3>}
                   {secondDetail && <h3>Ready for Delivery</h3>}
                   {thirdDetail && <h3>Total Users</h3>}
                </div>
                <div>
                    <hr></hr>
                 </div>
                 </div>
            </div>

           { (firstDetail || thirdDetail) && <div className="orders-list">
                    <div className="orders-list-title">
                        <h3>Grocery</h3>
                    </div>
                    <div className="orders-count count-1">
                        {firstDetail && orderCount && orderCount[0].grocyOrderCount}
                        {thirdDetail && userCount && userCount[0].grocyUserCount}
                    </div>

                    <div className="orders-list-title">
                        <h3>Liquor</h3>
                    </div>
                    <div className="orders-count count-2">
                       {firstDetail && orderCount && orderCount[0].liquorOrderCount}
                       {thirdDetail && userCount && userCount[0].liquorUserCount}
                    </div>
           </div> }

            {secondDetail && <ReadyForDeliveryTable dashboardDelivery={dashboardDelivery} />}
      
        
        </div>
    </div>
    )
}


const mapStateToProps = state => ({
    orderCount:state.dashboard.orderDetails,
    userCount:state.dashboard.userCount,
    dashboardDelivery:state.dashboard.dashboardDelivery,
})

export default connect(mapStateToProps)(Dashboard);
import React, { useState, Fragment, useEffect } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//sidebar
import DashBo from "./components/sidebarComponents/DashBo";
import Dashboard from "./components/sidebarComponents/Dashboard";
import ProductManagement from "./components/sidebarComponents/ProductManagement";
import Orders from "./components/sidebarComponents/Orders";
import PaymentDetails from "./components/sidebarComponents/PaymentDetails";
import PickListPrint from "./components/sidebarComponents/PickListPrint";
import Career from "./components/sidebarComponents/Career/Career";
import InstructionManual from "./components/sidebarComponents/InstructionManual";
import Newarrival from "./components/sidebarComponents/Newarrival";
import Inventoryupload from "./components/sidebarComponents/InventoryUpload"
import Pages from "./components/sidebarComponents/Pages";
//___________-
import Login from "./components/Login/login";
import Forgotpass from "./components/Forgotpass/forgotpass";
import Resetpass from "./components/Restpass/resetpass";

// policy pages
import TermsCondition from "./policy/TermsCondition";
import PrivacyPolicy from "./policy/PrivacyPolicy";
import CancellationRefund from "./policy/CancellationRefund";

// Privateroute
import PrivateRoute from "./routing/PrivateRoute";


import "./index.css";
import "./App.css";
import 'antd/dist/antd.css';

// redux
import { connect } from "react-redux";
import store from "./store/store";
import { loadUser } from "./actions/auth"



const App = ({ isAuthenticated }) => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <div>
      
      <Router basename="/?/">

        {!isAuthenticated &&
        <>
          <Route path="/" component={Login} exact />  
          <Route path="/forgotpassword" component={Forgotpass} exact/>
          <Route path="/resetpassword" component={Resetpass} exact/>
           <Route path="/terms" component={TermsCondition} exact/>
          <Route path="/privacy" component={PrivacyPolicy} exact/>
          <Route path="/cancelrefund" component={CancellationRefund} exact/> 
        </>
        }

        {isAuthenticated &&
          <Fragment>
            <Header />
          </Fragment>
        }


        <div className="content-flex">
          {isAuthenticated && <Sidebar />}
          <Switch>
            {/* Privateroutes */}
            <PrivateRoute path="/dashboard" component={DashBo} />
            <PrivateRoute path="/productManagement" component={ProductManagement} />
            <PrivateRoute path="/orders" component={Orders} />
            <PrivateRoute path="/payment" component={PaymentDetails} />
            <PrivateRoute path="/picklist" component={PickListPrint} />
            <PrivateRoute path="/career" component={Career} />
            <PrivateRoute path="/instructionmanual" component={InstructionManual} />
            <PrivateRoute path="/newarrival" component={Newarrival} />
            <PrivateRoute path="/inventory" component={Inventoryupload} />
            <PrivateRoute path="/pages" component={Pages} />
          </Switch>
        </div>


      </Router>


    </div>
  )
}



const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps)(App);
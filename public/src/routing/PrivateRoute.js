import React,{useEffect,useState} from "react";
import {Route,Redirect} from "react-router-dom";
import {useSelector,connect,useDispatch} from "react-redux";
import {loadUser} from "../actions/auth";


const PrivateRoute = ({ component:Component,isAuthenticated,...rest}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser())
      },[dispatch])


    return(
        
        <Route 
        {...rest}
        render={(props) => isAuthenticated !== null && !isAuthenticated ? 
        ( <Redirect to="/" />)
        :
        (
            <Component {...props} />  
        )
       }
       />           
    )
    
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute); 
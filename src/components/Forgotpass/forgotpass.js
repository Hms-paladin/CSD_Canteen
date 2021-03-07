import React, { Component } from 'react'
import '../Login/login.css'
import palm from '../images/panamaram.jpeg'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import InputAdornment from '@material-ui/core/InputAdornment';

import Eye from '../images/view.png'
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";


export default class Forgotpass extends Component {
    constructor(props) {
        super(props);
         this.state={
      
        hidden:true,
         }
        }
         toggleshow=()=>
         {
           this.setState({hidden:!this.state.hidden})
           console.log("i am clicked",this.state.hidden)
         }
         onchange=(e,key)=>
         {
              if(key === "email") {
                this.setState({
                  email:e.target.value
                },() => this.validateEmail(this.state.email))
              }
       
              if(key === "password") {
                this.setState({password:e.target.value},() => this.setState({ [key+"Error"]:false }))
              }
       
         }
      
    render() {
        return (
          
            <div className="login_container">
                
                <div className="logincard forgotcard">
                    
                    <div className="flex1">
                      <img src={palm}/>
                      <div className="caps">GOLDEN PALM</div>
                    </div>
                    <div className="flex2">
                        <div className="userlog forgot">Forgot your password?</div>
                        <div className="forgottxt">Enter your email address below, we 'll send a link to reset your password</div>

                        <div className="email_container">
                        <TextField  type="email"  placeholder=""  label="EMAIL" name="email"  autoComplete="off"
                  InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                      </IconButton>
                    </InputAdornment>
                  )
                }}/>
                        </div>
                        {/* <div className="email_container">
                        <TextField  type={this.state.hidden ? "password" : "text"} onChange={(e) => this.onchange(e,"password")}  value={this.state.password} placeholder="" className="trrainer_password" name="password" label="PASSWORD"  required="true"
                  onKeyDown={this.pressEnter} autoComplete="off"
                  InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <img className="logineye_icon" alt='eye' src={Eye} onClick={this.toggleshow}/>
                   

                    </IconButton>
                  </InputAdornment>
                )
           }}/>
                        </div> */}
                        <div className="loginbtn">
                       <Button >  <Link to= "/resetpassword">Send</Link></Button>
                        </div>
                        <div className="frgtpass">
                            <Link to="/">Back to login</Link>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

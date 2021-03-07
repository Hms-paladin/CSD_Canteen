import React, { Component } from 'react'
import '../Login/login.css'
import palm from '../images/panamaram.jpeg'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import InputAdornment from '@material-ui/core/InputAdornment';

import Eye from '../images/view.png'
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";


export default class Resetpass extends Component {
    constructor(props) {
        super(props);
         this.state={
      
        newhidden:true,
        confirmhidden:true
         }
        }
         newtoggleshow=()=>
         {
           this.setState({newhidden:!this.state.newhidden})
           console.log("i am clicked",this.state.hidden)
         }
         confirmtoggleshow=()=>
         {
           this.setState({confirmhidden:!this.state.confirmhidden})
           console.log("i am clicked",this.state.hidden)
         }
         onchange=(e,key)=>
         {
             
       
              if(key === "newpassword") {
                this.setState({newpassword:e.target.value},() => this.setState({ [key+"Error"]:false }))
              }
              
              if(key === "confirmpassword") {
                this.setState({confirmpassword:e.target.value},() => this.setState({ [key+"Error"]:false }))
              }
       
           
         }
      
    render() {
        return (
          
            <div className="login_container">
                
                <div className="logincard">
                    
                    <div className="flex1">
                      <img src={palm}/>
                      <div className="caps">GOLDEN PALM</div>
                    </div>
                    <div className="flex2">
                        <div className="userlog">Reset password</div>
                        
                        <div className="email_container">
                        <TextField  type={this.state.newhidden ? "password" : "text"} onChange={(e) => this.onchange(e,"newpassword")}   placeholder="" className="trrainer_password" name="password" label="NEW PASSWORD"  required="true"
                  onKeyDown={this.pressEnter} autoComplete="off"
                  InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <img className="logineye_icon" alt='eye' src={Eye} onClick={this.newtoggleshow}/>
                   

                    </IconButton>
                  </InputAdornment>
                )
           }}/>
                        </div>
                       
                        <div className="email_container">
                        <TextField  type={this.state.confirmhidden ? "password" : "text"} onChange={(e) => this.onchange(e,"confirmpassword")}   placeholder="" className="trrainer_password" name="password" label="CONFIRM PASSWORD"  required="true"
                  onKeyDown={this.pressEnter} autoComplete="off"
                  InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <img className="logineye_icon" alt='eye' src={Eye} onClick={this.confirmtoggleshow}/>
                   

                    </IconButton>
                  </InputAdornment>
                )
           }}/>
                        </div>
                        <div className="loginbtn">
                        <Button 
                        // onClick={() => this.props.changeAuth()}
                        >Reset</Button>
                        </div>
                        <div className="frgtpass">
                        <Link to="/">Cancel</Link>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

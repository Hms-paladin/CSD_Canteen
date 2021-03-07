import React, { useState, useEffect } from 'react'
import './login.css'
import palm from '../images/panamaram.jpeg'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import InputAdornment from '@material-ui/core/InputAdornment';

import Eye from '../images/view.png'
import { Button } from '@material-ui/core';

import { useDispatch ,connect} from "react-redux";
import { login } from "../../actions/auth";

import { withRouter,Link } from "react-router-dom";



const Login = ({ history,authMsg }) => {


  const dispatch = useDispatch();


  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [ showModal, setShowModal] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(true)

  const { email, password } = loginData;

  const [error, setError] = useState({
    emailError: "",
    passwordError: ""
  })

  const { emailError, passwordError } = error;

  const [hidden, setHidden] = useState(true)
  
  useEffect(() => {

  },[showModal]);
  


  const toggleshow = () => {
    setHidden(!hidden)
  }

  // const subLink = (contentKey) => {
  //   // alert(2)
  //   // setShowModal(!showModal)
  //   if(contentKey===4){
  //     return <a href="/termscondition" target="_blank"></a>
  //     history.push("/termscondition")
  //   }else if(contentKey===5){
  //     history.push("/privacypolicy")
  //   }else{
  //     history.push("/cancellationrefund")
  //   }
  // }

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }

  }

  const handleChange = (e, name) => {
    name === "email" && validateEmail(e.target.value)

    name === "email" && e.target.value !== "" && setError({ emailError: false })
    name === "password" && e.target.value !== "" && setError({ passwordError: false })

    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const validateEmail = (data) => {

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(data)) {
      setInvalidEmail(true)
    } else {
      setInvalidEmail(false)
    }

  }


  const handleSubmit = () => {

    if (email === "") {
      setError({ emailError: "Field Required" })
    }

    if (password === "") {
      setError({ passwordError: "Field Required" })
    }

    if (email && password !== "") {
      dispatch(login({ email, password }, history));
      if(authMsg === false){
        console.log(authMsg ,"Failed")
        toggle();
      } else{
        console.log(authMsg,"Success")
      }
    }

  }
// ____________________________________
const [modal, setModal] = useState(false);

const toggle = () => setModal(!modal);
// ____________________________________

  return (
    <>
      <div className="login_container">
{/* ___________________________________ */}
<div>
      <Modal isOpen={modal} toggle={toggle} centered={true} >
        <ModalHeader toggle={toggle}>Authentication Failed</ModalHeader>
        <ModalBody>
        "The Email address that you have entered does not match any account"
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
    </div>
{/* ___________________________________ */}
        <div className="logincard">

          <div className="flex1">
            <img src={palm} alt="logo" />
            <div className="caps">GOLDEN PALM</div>
          </div>
          <div className="flex2">
            <div className="userlog">User Login</div>
            <div className="email_container">
              <TextField value={email} type="email" placeholder="" label="Email Address" name="email" autoComplete="off" onChange={(e) => handleChange(e, "email")}
                onKeyDown={(e) => pressEnter(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                      </IconButton>
                    </InputAdornment>
                  )
                }} />

            </div>

            <div className="error">{emailError && emailError}</div>

            <div className="error">{!invalidEmail && <span>Invalid email</span>}</div>

            <div className="email_container">
              <TextField type={hidden ? "password" : "text"} value={password} placeholder="" className="trrainer_password" name="password" label="PASSWORD" required="true"
                autoComplete="off" onChange={(e) => handleChange(e, "password")}
                onKeyDown={(e) => pressEnter(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <img className="logineye_icon" alt='eye' src={Eye} onClick={toggleshow} />
                      </IconButton>
                    </InputAdornment>
                  )
                }} />
            </div>

            <div className="error">{passwordError && passwordError}</div>
            <div className="loginbtn">
              <Button onClick={() => handleSubmit()}>Login</Button>
            </div>
            <div className="frgtpass">
              <Link to="/forgotpassword">Forgot password?</Link>
                        </div>

            <div className="quicklinks">
              <button><a href="/?/terms" target="_blank">Terms & Conditions</a></button>
              <button><a href="/?/privacy" target="_blank">Privacy Policy</a></button>
              <button><a href="/?/cancelrefund" target="_blank">Cancellation and Refund</a></button>
            </div>

          </div>

        </div>
      </div>
      {/* {
        showModal === true &&
      <div className="container demo">

        <div className="modal right fade" id="myModal2" role="dialog" aria-labelledby="myModalLabel2">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel2">Right Sidebar</h4>
              </div>
              <div className="modal-body">
                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
					      </p>
              </div>

            </div>
          </div>
        </div>


      </div>
      } */}



    </>
  )
}



const mapStateToProps = state => ({
  authMsg:state.auth.isAuthenticated
  // ...state.auth
})

export default connect(mapStateToProps)(withRouter(Login));
// export default withRouter(Login);
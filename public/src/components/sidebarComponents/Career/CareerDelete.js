import React from "react";
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import './CareerModals.css'
import Question from "../../images/Question_Mark.png"
import {useDispatch} from "react-redux";
import {deleteCareer} from "../../../actions/career";

const CareerDelete = ({closemodal,delId}) => {

    const dispatch = useDispatch();

    const deleteRecord = () => {
        dispatch(deleteCareer(delId))
        closemodal()
    }

    return(
        <div>
       <div className=""> 
                <Grid container>
                    <Grid item xs={12} md={12} className="">
                      <div className="career_delete">
                          <img src={Question}  style={{width:"50%"}} alt="Delete"/>
                          <p className="delete_para">Are You Sure Want to Delete This Record ?</p>
                          </div>
                           <div className="button_delcareer">
                               <Button className="delcareer_cancel" onClick={closemodal}>Cancel</Button>
                           <Button className="delcareer_ok" onClick={deleteRecord}>Ok</Button></div>
                      
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default CareerDelete;
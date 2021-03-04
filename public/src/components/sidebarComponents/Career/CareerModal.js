import React,{useState,useEffect} from "react";
import './CareerModals.css';
import TextField from '@material-ui/core/TextField';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from "@material-ui/core";
import moment from "moment"
import {addCareer,editCareer} from "../../../actions/career";
import {useDispatch,connect} from "react-redux";



const dateFormat = "YYYY MMM DD"

const CareerModal = ({btnProps,closemodal,adminUserId,editId,career,add}) => {

    const dispatch = useDispatch();

    const [careerData,setCareerData] = useState({
        careerTitle:"",
        careerLocation:"",
        careerDate: moment(),
        careerEmailId:"",
        careerDescription:"",
        adminUserId,
        careerId:null
    })

 

    const {careerTitle,careerLocation,careerDate,careerEmailId,careerDescription} = careerData;

    useEffect(() => {
        if(!add) {
        let findData = career && career.length > 0 && career.find(c => c.careerId === editId && editId)
        console.log("sdfjshdfjhsdf",findData)
        const {careerTitle,careerLocation,careerDate,careerMailId,careerDescription} = findData;

       
         setCareerData({
            careerTitle,
            careerLocation,
            careerEmailId:careerMailId,
            careerDate:moment(careerDate),
            careerDescription,
            adminUserId,
            careerId:editId
         })
        }
    },[])



    const handleChange = (e) => setCareerData({...careerData,[e.target.name]:e.target.value})

    const handleDate = (data) => {
        
        setCareerData({...careerData,careerDate:data})
    }

    const handleDescription = (e,editor) => {
        
        const data = editor.getData();
      
        setCareerData({...careerData,careerDescription:data})
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(add){
        dispatch(addCareer(careerData))
        closemodal()
        }else{
            dispatch(editCareer(careerData))
            closemodal()
        }
    }
    
   
    return(
        <div className="addcareer_head">
            <div className="addcareer_title">
                <div className="label_names">Title</div>
                <TextField id="outlined-basic"  variant="outlined" name="careerTitle" value={careerTitle} onChange={(e) => handleChange(e)} />
            </div>

            <div className="addcareer_locdate">
             
             <div>
                <div className="label_names">Location</div>
                <TextField id="outlined-basic"  variant="outlined" name="careerLocation" value={careerLocation} onChange={(e) => handleChange(e)} />
            </div>
           

            <div className="modal_date">
                <div className="label_names">Date</div>        
                <DatePicker className="date_picker" name="careerDate" value={careerDate} format={dateFormat} onChange={(data) => handleDate(data)} />
            </div>

            </div>

            <div className="addcareer_mailid">

            <div className="label_names">Email Id(for applying)</div>
                  <TextField id="outlined-basic"  variant="outlined" name="careerEmailId"  value={careerEmailId} onChange={(e) => handleChange(e)} />
            </div>

            <div className="addcareer_jobdesc">

            <div className="label_names">Job Description</div>
            <CKEditor 
            className="description_text"
            editor={ClassicEditor}
            onChange={(e,editor) => handleDescription(e,editor)}
            onInit={ editor => {
                editor.setData(careerDescription)
                  } }
            config={{
                removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 
                                'ImageToolbar', 'ImageUpload', 'MediaEmbed', 
                                'Undo', 'Table', 'BlockQuote', 'Indent', 'Redo', 'Essentials']
              }}
          />


            </div>
            <div className="button_career">
            <Button className="addcareer_btn" onClick={(e) => handleSubmit(e)}>  {btnProps && btnProps ? "Add" : "Update" } </Button> 
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    adminUserId:state.auth.user.adminId,
    career:state.career.payload
})

export default connect(mapStateToProps)(CareerModal);
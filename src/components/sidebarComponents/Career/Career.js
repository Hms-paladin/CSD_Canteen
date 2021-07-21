import React,{useEffect,useState,Fragment} from "react";
import TableHeader from "../../tableHeader/TableHeader";
import TableComponent from "../../tableComponent/TableComponent";
import Modalcomp from "../../helpers/modalcomp/ModalComp"
import {getCareerDetails} from "../../../actions/career";
import {useDispatch,connect,useSelector} from "react-redux";

import CareerModal from "./CareerModal"
import CareerView from "./CareerView"
import CareerDelete from "./CareerDelete"
import '../../../App.css';



const Career = () => {
   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCareerDetails())
    },[dispatch])
    

   
    const [editopen,seteditopen]= useState(false)
    const [openview,setopenview]= useState(false)
    const [insertopen,setinsertopen] = useState(false)
    const [opendelete,setopendelete] = useState(false)

    const [editId,setEditId] = useState(null)
    const [delId,setDelId] = useState(null)


    const careers = useSelector(state => ({career:state.career.careeres && state.career.careeres}))



    

 
   

 
    const modelopen = (data,id) => {
      
   
        if (data === "view") {    
            setopenview(true)  
            setinsertopen(false)
            seteditopen(false)  
             
        }
       
        if (data === "edit") {   
            setEditId(id) 
            setopenview(false)  
            setinsertopen(false)
            seteditopen(true)         
        }
                
     }

     const insertModalOpen = () =>{
         setopenview(false)
         setinsertopen(true)
         seteditopen(false)
     }

     const deleteopen =(e,id)=>{
         setDelId(id)
         setopendelete(true)
     }

     const closemodal =()=>{
         setopenview(false)
         setinsertopen(false)
         seteditopen(false)
         setopendelete(false)
     }

    return(
        <Fragment>
        <div className="main-content">
        <TableHeader title="Career" modelopen={insertModalOpen} addButton={true} btnTitle="Add"/>
        
        <div className="main-content-details">
        <TableComponent
         heading={[
            { id: "", label: "S.No" },
            { id: "title", label: "Title" },
            { id: "location", label: "Location" },
            { id: "date", label: "Date" },
            { id: "email", label: "Email" },
            { id: "", label: "Action" }           
        ]}
       
        rowdata={careers.career && careers.career.length > 0  ? careers.career : []} 
        UploadIcon="close"
        GrandTotal="close"
        Workflow="close"
        modelopen={(e,id) => modelopen(e,id)}
        deleteopen={(e,id) => deleteopen(e,id)}
        pdfDownload="close"
        // props_loading={this.state.props_loading}
        specialProp={true}        
        tableRowCss={"CareerTableRowCss"}
/>
        </div>
    </div>


           <Modalcomp
              clrchange="text_color"
              visible={insertopen ? insertopen : editopen}
              title={insertopen ? "Add Career" : "Edit Career"}
              closemodal={(e) => closemodal(e)}
              xswidth={"xs"}
            >
              <CareerModal
                btnProps={insertopen}             
                closemodal={() => closemodal()}
                add={insertopen}
                editId={editId}
              />
            </Modalcomp>

            <Modalcomp  visible={openview} title={"View Career"} closemodal={closemodal} xswidth={"xs"}>
            <CareerView closemodal={closemodal}     />
            </Modalcomp>


            <Modalcomp  visible={opendelete} title={"Delete"} closemodal={closemodal} xswidth={"xs"}>
               <CareerDelete closemodal={closemodal} delId={delId}    />
            </Modalcomp>
        
</Fragment>

    )
}

        


const mapStateToProps = state => ({
    career:state.career.careeres
})


export default Career;
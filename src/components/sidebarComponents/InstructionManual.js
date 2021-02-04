import React,{useEffect,useState} from "react";
import TableHeader from "../tableHeader/TableHeader"
import TableComponent from "../tableComponent/TableComponent";
import {Select} from "antd";
import UploadComponent from '../helpers/UploadComponent/UploadComponent';
import palm from '../images/panamaram.jpeg'
import {useDispatch,connect} from "react-redux";
import {getInstructionData,getInstructionLanguage,updateInstruction} from "../../actions/instructionmanual";


const {Option} = Select;

const InstructionManual = ({ instructionData,instructionLanguage }) => {

    const [error,setError] = useState(false)
    const [instructionId,setInstructionId] = useState("")
    const [instructionLang,setInstructionLang] = useState("")
    const [instructionFile,setInstructionFile] = useState("")

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInstructionData())
        dispatch(getInstructionLanguage())
    },[])

    const modelopen = (data,id) => {
        const findData = instructionData.find(data => data.id === id)
        setInstructionId(findData.instructionId)
        setInstructionLang(findData.instructionLanguage)
        setInstructionFile(findData.instructionFileName)
        
    }

    const getInstructionLanguages = () => {
        console.log("sdfasdlflgasgfsadf",instructionLanguage)
        let instructionLanguages = [];
        for(let i=0;i<instructionLanguage.length;i++) {
                instructionLanguages.push(<Option key={i+1} value={instructionLanguage[i].instructionId}>{instructionLanguage[i].instructionLanguage}</Option>)
        }

        console.log("sadfgsad",instructionLanguages)
        return instructionLanguages;
    }

    const getFileName = (fileName,imageData) => {

        if(instructionId === "") {
            alert("Choose Language")
        }
       
        if(fileName === "") {
            setError(true) 
        }else {
            setError(false)
            dispatch(updateInstruction(instructionId,imageData))
        }

    }

    const handleLanguage = (data) => {
        setInstructionId(data)
    }

  
    return(
        <div className="main-content">
        <TableHeader title="Instruction Manual" />

        <div className="main-content-details">
            <div className="Instructionmanual_cont">
           
                <div className="langdrop">
                    <div className="lang__label">
                      <label>Language</label>
                    </div>
                <Select value={instructionLang !== "" && instructionLang} style={{width:"120%"}} onChange={(data) => handleLanguage(data)}>
                         {instructionLanguage && instructionLanguage.length > 0 && getInstructionLanguages()}
                </Select> 
            
                </div>

                <div className="Uploadcomp">
                  <UploadComponent value={instructionFile} title="PDF upload" icon={palm} accept="application/pdf" getFileName={getFileName} />
                </div>
                 <div className="upload__error">
                     {error && "Field Required"}
                 </div>
            </div>

                 <TableComponent
                    heading={[
                        { id: "", label: "S.No" },
                        { id: "language", label: "Language" },
                        { id: "filename", label: "File Name" },
                        { id: "lastupdated", label: "Last Updated" },            
                        { id: "", label: "Action" }
                    ]}
            
                
                    rowdata={instructionData && instructionData.length > 0 ? instructionData : []}
                
                    // actionclose="close"
                
                    EditIcon="open"
                    VisibilityIcon="close"
                    DeleteIcon="close"
                    
                    UploadIcon="close"
                    GrandTotal="close"
                    Workflow="close"
                    checkbox="close"
    

                    modelopen={(e,id) => modelopen(e,id)}
                    // props_loading={this.state.props_loading}
                    specialProp={true}    
            />
        </div>
    </div>
    )
}


const mapStateToProps = state => ({
    instructionData:state.instructionmanual.instructionData,
    instructionLanguage:state.instructionmanual.instructionLanguage
})


export default connect(mapStateToProps)(InstructionManual);
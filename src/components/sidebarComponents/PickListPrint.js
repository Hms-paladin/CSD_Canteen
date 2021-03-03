import React,{useEffect} from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableComponent from "../tableComponent/TableComponent";
import {useDispatch,connect} from "react-redux";
import {getPrintListData} from "../../actions/picklistprint"


const PickListPrint = ({ picklistdata }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPrintListData())
    },[])
    return(
            <div className="main-content">
                <TableHeader title="Pick List Print" />
                <div className="main-content-details">
                <TableComponent
                heading={[
                    { id: "", label: "S.No" },
                    { id: "date", label: "Date" },
                    { id: "numberoforder", label: "Number Of Order" },
                    { id: "", label: "Action" }           
                ]}
            
                rowdata={picklistdata && picklistdata.length > 0 ? picklistdata : []}
        
                DeleteIcon="close"
                EditIcon="close"
                
                UploadIcon="close"
                GrandTotal="close"
                Workflow="close"
                checkbox="close"

                modelopen={(e,id) => this.modelopen(e,id)}
                // props_loading={this.state.props_loading}
                specialProp={true}


        />
                </div>
            </div>
    )
}


const mapStateToProps = state => ({
    picklistdata:state.picklistprint.picklistdata
})

export default connect(mapStateToProps)(PickListPrint);
import React,{useEffect,useState} from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableComponent from "../tableComponent/TableComponent";
import {useDispatch,connect} from "react-redux";
import {getPrintListData} from "../../actions/picklistprint"


const PickListPrint = ({ picklistdata ,list_details}) => {

    // const [showList,setShowList] = useState(true)
    // const [showIndividual,setIndividual] = useState(false)

    // const [ListView,setListView] = useState({})
    // const [ListDetails,setListDetails] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPrintListData())
    },[])

    // const modelopen = (e,id) => {
       
    //     let list_details = [];
    //     const individualPick = list_details && list_details.length > 0 && list_details.find(data => data.orderId === id)

    //     setListView(individualPick)

    //     console.log("individualPick",individualPick)
    //     individualPick.list_details.length > 0 && individualPick.list_details.map((order) => {
    //         const {indexNumber,categoryName,subCategoryName,product,productAmount,orderDetailId} = order;

    //         list_details.push({
    //             indexNumber,
    //             categoryName,
    //             subCategoryName,
    //             product,
    //             productAmount,
    //             id:orderDetailId
    //         })
    //     })

    //     setListDetails(orderDetails)
    //     setShowList(false)
    //     setIndividual(true)
    // }
    // const changeView = () => {
    //     setIndividual(false)
    //     setShowList(true)
    // }
    return(
            <div className="main-content">
                <TableHeader title={showOrder ? "Pick List Print" : "Pick List Print view"} 
                // changeView={changeView}
                 />
                <div className="main-content-details">
             {/* { showList &&  */}
              <TableComponent
                heading={[
                    { id: "", label: "S.No" },
                    { id: "date", label: "Order Date" },
                    { id: "numberoforder", label: "Number Of Orders" },
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
            {/* } */}
         {/* {showIndividual && 
               <TableComponent
               heading={[
                { id: "", label: "S.No" },
                { id: "order id", label: "Order Id" },
                { id: "cardno", label: "Card No" },
                { id: "name", label: "Name" },
                 { id: "amount", label: "Total Amount(₹)" }, 
                // { id: "print", label: "Print" }, 
                          
            ]}
                    rowdata={list_details && list_details.length > 0 ? list_details : []}
                    actionclose="close"
                    DeleteIcon="close"
                    EditIcon="close"
                    checkbox="close"
                    UploadIcon="close"
                    GrandTotal="close"
                    Workflow="close"
                    modelopen={(e,id) => modelopen(e,id)}
                    // props_loading={this.state.props_loading}
                    specialProp={true}   
                />
            } */}
                </div>
            </div>
    )
}


const mapStateToProps = state => ({
    picklistdata:state.picklistprint.picklistdata,
    list_details:state.picklistprint.list_details
})

export default connect(mapStateToProps)(PickListPrint);
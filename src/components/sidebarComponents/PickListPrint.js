import React,{useState,useEffect} from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableComponent from "../tableComponent/TableComponent";
import {useDispatch,connect} from "react-redux";
import {getPrintListData} from "../../actions/picklistprint"

const PickListPrint = ({ orders,allDetails }) => {


    const [showList,setShowList] = useState(true)
    const [showIndividual,setIndividual] = useState(false)

    const [ListView,setListView] = useState({})
    const [ListDetails,setListDetails] = useState([])

    const dispatch = useDispatch();


    

        useEffect(() => {
        dispatch(getPrintListData())
    },[])

    const modelopen = (e,id) => {
       
        let ListDetails = [];
        const individualOrder = allDetails && allDetails.length > 0 && allDetails.find(data => data.orderId === id)

        setListView(individualOrder)

        console.log("individualOrder",individualOrder)
        individualOrder.ListDetails.length > 0 && individualOrder.ListDetails.map((order) => {
            const {indexNumber,categoryName,subCategoryName,product,productAmount,orderDetailId} = order;

            ListDetails.push({
                indexNumber,
                categoryName,
                subCategoryName,
                product,
                productAmount,
                id:orderDetailId
            })
        })

        setListDetails(ListDetails)
        setShowList(false)
        setIndividual(true)
    }


    const changeView = () => {
        setIndividual(false)
        setShowList(true)
    }

    return(
          <div className="main-content">
                <TableHeader title={showList ? "Orders" : "Order view"} showDatePicker={showList ? true : false} showIndividualOrder={showIndividual} orderView={ListView} changeView={changeView} />

                <div className="main-content-details">
            {showList && <TableComponent
                heading={[
                    { id: "", label: "S.No" },
                    { id: "date", label: "Order Date" },
                    { id: "numberoforder", label: "Number Of Orders" },
                    { id: "", label: "Action" }           
                ]}
                rowdata={orders && orders.length > 0 ? orders : []}
                // actionclose="close"
                DeleteIcon="close"
                EditIcon="close"
                checkbox="close"
                UploadIcon="close"
                GrandTotal="close"
                Workflow="close"
                modelopen={(e,id) => modelopen(e,id)}
                // props_loading={this.state.props_loading}
                specialProp={true}
            /> }
            {showIndividual && 
               <TableComponent
                        heading={[
                        { id: "", label: "S.No" },
                        { id: "indexno", label: "Index Number" },
                        { id: "category", label: "Category" },
                        { id: "subcategory", label: "Sub Category" },
                        { id: "productname", label: "Product Name" }, 
                        { id: "amount", label: "Amount (₹)" },            
                    ]}
                    rowdata={ListDetails && ListDetails.length > 0 ? ListDetails : []}
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
            }
                </div>
            </div>

    )
}


 const mapStateToProps = state => ({
        orders:state.picklistprint.picklistdata,
        allDetails:state.picklistprint.list_details
    })
    
export default connect(mapStateToProps)(PickListPrint);
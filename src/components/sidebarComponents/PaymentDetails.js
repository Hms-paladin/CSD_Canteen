import React,{useEffect, useState} from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableComponent from "../tableComponent/TableComponent";
import {useDispatch,connect} from "react-redux";
import {getPaymentListData} from "../../actions/payment"


const PaymentDetails = ({ paymentdata }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPaymentListData())
    },[])
    const [show,setShow] = useState(true)
    return(
        <div className="main-content">
        <TableHeader title="Payment Details" showDatePicker={show ? true : false} showDocuments={true} />

        <div className="main-content-details">
    <TableComponent
     heading={[
        { id: "", label: "S.No" },
        { id: "orderid", label: "Order Id" },  { id: "date", label: "Order Date" },,
        { id: "orderamount", label: "Order Amount (₹)" },
        { id: "name", label: "Name" },
        { id: "bankname", label: "Bank Name" }, 
        { id: "transactionid", label: "Transaction Id" },  
    ]}

   
   rowdata={paymentdata && paymentdata.length > 0 ? paymentdata : []}
        
    actionclose="close"
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
    paymentdata:state.payment.paymentdata
    // ...state.payment
})

export default connect(mapStateToProps)(PaymentDetails);

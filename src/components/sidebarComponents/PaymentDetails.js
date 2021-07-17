import React,{useEffect, useState} from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableComponent from "../tableComponent/TableComponent";
import {useDispatch,connect} from "react-redux";
import {getPaymentListData} from "../../actions/payment"


const PaymentDetails = ({ paymentdata }) => {

    const dispatch = useDispatch();
    const[tabledata,settabledata]=React.useState([])

    useEffect(() => {
        dispatch(getPaymentListData())
    },[])
    // useEffect(() => {
    //     let arr=[]
    //     paymentdata.map((data)=>{   
    //     arr.push({
    //         orderid: data.orderid ,
    //         orderamount : data.orderamount,
    //         Name:data.Name,
    //         BankName:data.BankName,
    //         TransactionId:data.TransactionId,
    //         id:1,

    //     })
        
    //     })
    //     console.log(arr,"arr")
    // },[paymentdata])
    const getrangeDate = (data) => {
        dispatch(getPaymentListData({ startDate: data.startDate, endDate: data.endDate }))
    }
    const [show,setShow] = useState(true)
    console.log(paymentdata,"paymentdata")
    return(
        <div className="main-content">
        <TableHeader title="Payment Details" showDatePicker={show ? true : false} showDocuments={true} getrangeDate={(data) => { getrangeDate(data) }} Params={paymentdata}/>

        <div className="main-content-details">
    <TableComponent
     heading={[
        { id: "id", label: "S.No" },
        { id: "orderId", label: "Order Id" },  
        { id: "orderDate", label: "Order Date" },,
        { id: "orderAmount", label: "Order Amount (₹)" },
        { id: "name", label: "Name" },
        // { id: "bankName", label: "Bank Name" }, 
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

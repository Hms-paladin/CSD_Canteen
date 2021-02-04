import React from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableComponent from "../tableComponent/TableComponent";


class PaymentDetails extends React.Component {

    state = {
        paymentData:[
            {
                orderid: "6574547ADSS",
                orderamount : "4000",
                Name:"Jeevan",
                BankName:"DBS Bank",
                TransactionId:"132456743",
                id:1
            },
            {
                orderid: "6574547ADSS",
                orderamount : "4000",
                Name:"Jeevan",
                BankName:"DBS Bank",
                TransactionId:"132456743",
                id:2
            },
            {
                orderid: "6574547ADSS",
                orderamount : "4000",
                Name:"Jeevan",
                BankName:"DBS Bank",
                TransactionId:"132456743",
                id:3
            }
        ]
    }
    render() {
        return(
            <div className="main-content">
                    <TableHeader title="Payment Details" showDocuments={true} />

                    <div className="main-content-details">
                <TableComponent
                 heading={[
                    { id: "", label: "S.No" },
                    { id: "orderid", label: "Order Id" },
                    { id: "orderamount", label: "Order Amount" },
                    { id: "name", label: "Name" },
                    { id: "bankname", label: "Bank Name" }, 
                    { id: "transactionid", label: "Transaction Id" },            
                   
                ]}
           
               
                rowdata={this.state.paymentData}
            
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
}

export default PaymentDetails;
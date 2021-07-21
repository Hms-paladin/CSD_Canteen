import React from "react";
import "./PaymentPrintData.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printTableData,"printTableData")
        var printBodyData = this.props.printTableData!=null?this.props.printTableData.map((printdata,index)=>{
            return(
                <tr>
                 <td>{index+1}</td>
              <td>{printdata.orderid}</td>
              <td>{printdata.date}</td>
              <td>{printdata.orderamount}</td>
              <td>{printdata.name}</td>
              <td>{printdata.transactionid}</td>       
            </tr>
            )
        }):[]

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Payment Details</div>
        <table>
          <thead>
          <th>S.No</th>         
            <th>Order ID</th>
            <th>Date</th>
            <th>Order Amount</th>
            <th>Name</th>
            <th>Transaction ID</th>            
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }
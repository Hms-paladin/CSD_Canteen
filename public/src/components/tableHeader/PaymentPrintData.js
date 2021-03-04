import React from "react";
import "./PaymentPrintData.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printTableData,"printTableData")
        var printBodyData = this.props.printTableData.map((printdata,index)=>{
            return(
                <tr>
                 <td>{index+1}</td>
              <td>{printdata.appointment_type}</td>
              <td>{printdata.name}</td>
              <td>{printdata.gender}</td>
              <td>{printdata.age}</td>
              <td>{printdata.appointment_date}</td>
              <td>{printdata.appointment_time}</td>
       
            </tr>
            )
        })

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Appointment List</div>
        <table>
          <thead>
          <th>S.No</th>         
            <th>Type</th>
            <th>Customer</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Date</th>
            <th>Time</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }
import React from "react";
import TableComponent from "../tableComponent/TableComponent";

const ReadyForDeliveryTable = ({ dashboardDelivery }) => {
    return(
        <div>
        <TableComponent
        heading={[
                { id: "", label: "S.No" },
                { id: "orderdate", label: "Order Date" },
                { id: "orderid", label: "Order Id" },
                { id: "cardno ", label: "Card No" }, 
                { id: "name ", label: "Name" }, 
                { id: "totalamount", label: "Total Amount" },        
                ]}
                rowdata={dashboardDelivery && dashboardDelivery.length > 0 ? dashboardDelivery : []}
                actionclose="close"
                EditIcon="close"
                // VisibilityIcon="close"
                DeleteIcon="close"
                UploadIcon="close"
                GrandTotal="close"
                Workflow="close"
                checkbox="close"
               
                // props_loading={this.state.props_loading}
                specialProp={true}    
                
        />
    </div>
    )
}


export default ReadyForDeliveryTable;
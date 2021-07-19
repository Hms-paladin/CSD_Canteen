import React from "react";
import TableHeader from "../tableHeader/TableHeader"
import CSVUpload from "./csvUpload/CSVUpload.js";
import '../../App.css';
import "./ProductManagement.css";

class Inventoryupload extends React.Component {
    render() {
        return (
            <div className="main-content">
                <TableHeader title="Inventory File" />
                <div className="csvuploadContainer">
                    <CSVUpload page='inventoryUpload' label={"Inventory Upload"} />
                    <CSVUpload page={"insertCard"} label={"Card Details Upload"} />
                    <CSVUpload page={"insertProduct"} label={"Product Upload"} />
                </div>
            </div>
        )
    }
}


export default Inventoryupload;
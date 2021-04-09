import React from "react";
import TableHeader from "../tableHeader/TableHeader"
import TableComponent from "../tableComponent/TableComponent";
import Labelbox from "../helpers/labelbox/labelbox";
import Button from '@material-ui/core/Button';

import UploadComponent from '../helpers/UploadComponent/UploadComponent';
import palm from '../images/panamaram.jpeg';
import CSVUpload from "./csvUpload/CSVUpload.js";
import '../../App.css'


class Inventoryupload extends React.Component {

    state = {
        instructionData: [
            {
                index: "18204",
                product: "myfile.pdf",
                quantity: "115",
                id: 1
            },
            {
                index: "16547",
                product: "file.pdf",
                quantity: "120",
                id: 2
            },
            {
                index: "17584",
                product: "mydoc.pdf",
                quantity: "130",
                id: 3
            }
        ]
    }
    render() {
        return (
            <div className="main-content">
                <TableHeader title="Inventory File" />


                <div className="main-content-details">
                    <div className="Inventory_cont">
                        <div className="Uploadcomp">
                            {/* <UploadComponent title="Inventory Upload" icon={palm} /> */}
                            <CSVUpload />
                        </div>
                        {/* <div className="uploaddetail">
                            <span style={{ color: "grey" }}> Last Upload On:</span> 12 Nov 2020
                        </div> */}
                    </div>

                    {/* <TableComponent
                        heading={[
                            { id: "index", label: "Index Number" },
                            { id: "product", label: "Product Name" },
                            { id: "quantity", label: "Quantity" },
                        ]}


                        rowdata={this.state.instructionData}

                        actionclose="close"

                        EditIcon="close"
                        VisibilityIcon="close"
                        blockSno={true}
                        UploadIcon="close"
                        GrandTotal="close"
                        Workflow="close"
                        checkbox="close"

                        modelopen={(e, id) => this.modelopen(e, id)}
                        // props_loading={this.state.props_loading}
                        specialProp={true}
                    />
                    <div className="btn_flex">
                        <Button className="cancel">
                            Cancel
                        </Button>
                        <Button className="submit">
                            Confirm
                        </Button>
                    </div> */}
                </div>
            </div>
        )
    }
}


export default Inventoryupload;
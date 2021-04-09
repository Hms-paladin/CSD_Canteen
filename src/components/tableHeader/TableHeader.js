import React from "react";
import "./TableHeader.css";
import DateRangeSelect from "../helpers/DateRange/DateRange";
import { ReactSVG } from "react-svg";

import pdf from "../images/pdf.svg"
import print from '../images/print.svg'
import excel from '../images/excel.svg'
import ReactExport from "react-data-export";
import ReactToPrint from "react-to-print";
import PaymentPrintData from './PaymentPrintData';
import { Button } from "@material-ui/core";
import dateformat from "dateformat";
import { connect } from "react-redux";
import { getOrdersList } from "../../actions/orders";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class TableHeader extends React.Component {



    state = {
        appointlistData: [],
        startDate: new Date(),
        endDate: new Date(),
    }

    dayReport = (data) => {
        var startDate = dateformat(data[0].startDate, "yyyy-mm-dd")
        var endDate = dateformat(data[0].endDate, "yyyy-mm-dd")
        this.setState({ startDate, endDate })

        // this.props.dispatch(getOrdersList({ startDate, endDate }))
        this.props.getrangeDate({ startDate, endDate })

    }

    render() {

        // const {orderId,orderDate,cardNumber,userName} =  this.props.orderView;

        return (
            <div className="table_header">

                <div className="table_header-split">
                    <div className="table_header-title">
                        {this.props.showIndividualOrder && <div className="orderview__arr" onClick={this.props.changeView}>
                            &larr;
                    </div>}
                        {this.props.title && this.props.title}


                        {this.props.showIndividualOrder &&
                            <div className="individualOrder-container">
                                <div className="individualOrder__title">
                                    <span className="individualOrder__span">Order Id</span>
                                    <div className="individualOrder__span orderDetailsValue">{this.props.orderView && this.props.orderView.orderId}</div>
                                </div>

                                <div className="individualOrder__title">
                                    <span className="individualOrder__span">Order date</span>
                                    <div className="individualOrder__span orderDetailsValue">{dateformat(this.props.orderView && this.props.orderView.orderDate, "dd mmm yyyy")}</div>
                                </div>

                                <div className="individualOrder__title">
                                    <span className="individualOrder__span">card number</span>
                                    <div className="individualOrder__span orderDetailsValue">{this.props.orderView && this.props.orderView.cardNumber}</div>
                                </div>

                                <div className="individualOrder__title">
                                    <span className="individualOrder__span">customer name</span>
                                    <div className="individualOrder__span orderDetailsValue">{this.props.orderView && this.props.orderView.userName}</div>
                                </div>
                            </div>
                        }

                    </div>

                    {this.props.addButton == true ? <Button onClick={this.props.modelopen} className="header_button">
                        {this.props.btnTitle}
                    </Button> : null
                    }

                    {this.props.showDatePicker &&
                        <DateRangeSelect rangeDate={(item) => this.dayReport(item)} />
                    }




                    {this.props.showDocuments && <div className="icon-head">

                        {this.state.appointlistData.length === 0 ? <ReactSVG
                            onClick={this.Notification}
                            src={pdf}
                            style={{ marginRight: "15px", marginLeft: "15px" }}
                        /> : <ReactSVG
                            onClick={this.generatepdf}
                            src={pdf}
                            style={{ marginRight: "15px", marginLeft: "15px" }}
                        />}

                        {this.state.appointlistData.length === 0 ? <ReactSVG onClick={this.Notification} src={excel}
                            style={{ marginRight: "15px" }}
                        /> :
                            <ExcelFile filename={"Appointment List"} element={<ReactSVG src={excel}
                                style={{ marginRight: "15px" }}
                            />}>
                                <ExcelSheet name="Appointment List" />
                            </ExcelFile>
                        }

                        {this.state.appointlistData.length === 0 ?
                            <ReactSVG src={print} onClick={this.Notification} /> :
                            <ReactToPrint
                                trigger={() => <ReactSVG src={print} />}
                                content={() => this.componentRef}
                            />}
                        <div style={{ display: "none" }}>
                            <PaymentPrintData printTableData={this.state.appointlistData}
                                ref={el => (this.componentRef = el)} />
                        </div>
                    </div>
                    }

                </div>

            </div>
        )
    }
}

export default connect()(TableHeader);
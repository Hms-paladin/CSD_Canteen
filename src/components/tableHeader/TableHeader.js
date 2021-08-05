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
import { Spin, notification } from 'antd';
import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class TableHeader extends React.Component {

    state = {
        appointlistData: [],
        startDate: new Date(),
        endDate: new Date(),
    }
    // dayReport=(data,firstOpen)=>{
    //     console.log(data,"itemdaterange")
    //     var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
    //     var enddate = dateformat(data[0].endDate, "yyyy-mm-dd")
    //     if(!firstOpen){
    //     this.setState({ spinner: true })
    //     }
    //     var self = this
    //     axios({
    //       method: 'POST', //get method 
    //       url: apiurl + '/getPatientTestCancelled',
    //       data: {
    //         "lab_id": "2",
    //         "date": startdate,
    //         "period": "Day",
    //         "date_to":enddate
    //       }
    //     })
    //       .then((response) => {
    //         console.log(response, "response_data")

    //         var tableData = [];
    //         var tableDatafull = [];
    //         response.data.data.map((val, index) => {
    //           tableData.push({
    //             name: val.customer,
    //             // test: val.test,
    //             Bookdate: moment(val.book_date).format('DD MMM YYYY'),
    //             Canceldate: moment(val.cancel_date).format('DD MMM YYYY'),
    //             time: dateformat(new Date(val.cancel_date), "hh:MM TT"),
    //             id: index
    //           })
    //           tableDatafull.push(val)
    //         })

    //         self.setState({
    //           weekMonthYearData: tableData,
    //           wk_Mn_Yr_Full_Data: tableDatafull,
    //           props_loading: false,
    //           spinner:false
    //         })
    //       })
    //   }

    dayReport = (data) => {
        var startDate = dateformat(data[0].startDate, "yyyy-mm-dd")
        var endDate = dateformat(data[0].endDate, "yyyy-mm-dd")
        this.setState({ startDate, endDate })

        // this.props.dispatch(getOrdersList({ startDate, endDate }))
        this.props.getrangeDate({ startDate, endDate })

    }

    // generatepdf = () => {

    //     if (this.props.Params === null) {
    //         notification.info({
    //             description:
    //                 'No Data Found',
    //             placement: "topRight",
    //         });
    //     }
    //         else{
    //         const doc = new jsPDF("a4")
    //         var bodydata = []
    //         this.props.Params.map((data, index) => {
    //           bodydata.push([index + 1, data.orderid, data.date,data.orderamount,data.name,data.transactionid])
    //         })
    //         doc.autoTable({
    //           beforePageContent: function (data) {
    //             doc.text("Payment Details", 15, 23);
    //           },
    //           margin: { top: 30 },
    //           showHead: "everyPage",
    //           theme: "grid",
    //           head: ['S.No', 'Order ID','Date', 'Order Amount', 'Name','Transaction ID'],
    //           body: bodydata,
    //         })

    //         doc.save('Payment Details.pdf')
    //       }
    // }

    Notification = () => {
        notification.info({
            description:
                'No Data Found',
            placement: "topRight",
        });
    }

    render() {
        // const {orderId,orderDate,cardNumber,userName} =  this.props.orderView;
        console.log(this.props.getrangeDate, "getrangeDate");
        console.log(this.props.Params, 'params')
        console.log(this.state.appointlistData, "state")
        
        var multiDataSetbody = []
        this.props.Params!=null&&this.props.Params.map((xldata, index) => {
            if (index % 2 !== 0) {
                multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } }, { value: xldata.orderid, style: { alignment: { horizontal: "center" } } }, { value: xldata.date, style: { alignment: { horizontal: "center" } } }, { value: xldata.orderamount, style: { alignment: { horizontal: "center" } } }, { value: xldata.name, style: { alignment: { horizontal: "center" } } },{value:xldata.transactionid, style: { alignment: { horizontal: "center" } }}])
            } else {
                multiDataSetbody.push([
                    { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.orderid, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.date, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.orderamount, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.name, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }, { value: xldata.transactionid, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }])
            }
        })
        const multiDataSet = [
            {
                columns: [
                    { title: "S.No", width: { wpx: 35 }, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Order ID", width: { wch: 20 }, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Date", width: { wch: 20 }, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Order Amount", width: { wpx: 100 }, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Name", width: { wpx: 100 }, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Transaction ID", width: { wpx: 90 }, style: { alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } }
                ],
                data: multiDataSetbody
            }
        ];
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

                        {/* {this.props.Params === null ? <ReactSVG
                            onClick={this.Notification}
                            src={pdf}
                            style={{ marginRight: "15px", marginLeft: "15px" }}
                        /> : <ReactSVG
                            onClick={this.generatepdf}
                            src={pdf}
                            style={{ marginRight: "15px", marginLeft: "15px" }}
                        />} */}

                        {/* {this.props.Params === null ? <ReactSVG onClick={this.Notification} src={excel}
                            style={{ marginRight: "15px" }}
                        /> :
                            <ExcelFile filename={"Payment Details"} element={<ReactSVG src={excel}
                                style={{ marginRight: "15px" }}
                            />}>
                                <ExcelSheet dataSet={multiDataSet} name="Payment Details" />
                            </ExcelFile>
                        } */}

                        {this.props.Params === null ?
                            <ReactSVG src={print} onClick={this.Notification} /> :
                            <ReactToPrint
                                trigger={() => <ReactSVG src={print} />}
                                content={() => this.componentRef}
                            />}
                        <div style={{ display: "none" }}>
                            <PaymentPrintData printTableData={this.props.Params}
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

import React from "react";
import moment from 'moment';
import "./ComponentToprint.css";

export default class ComponentToPrint extends React.Component {
    state = {
        productDetails: [],
    }
    UNSAFE_componentWillReceiveProps(preState) {
        console.log(preState.productDetails, "productDetails")
        this.setState({
            productDetails: preState.productDetails
        })
    }
    render() {
        console.log(this.state.productDetails, "proddddddddd")
        return (
            <div>
                {this.state.productDetails.map((item) => {
                    const orderDetailsLength = item.orderDetails?.length
                    return (
                        <div className="printContainer">
                            {/* Object.keys(item.wholeDetails).length>0 ||  */}
                            {item.normalProduct.length > 0 && <><div>
                                <div className="canteenDetails">
                                    <div>Golden Palm Canteen</div>
                                    <div>Chennai</div>
                                    <div>Grocery</div>
                                </div>
                                <div className="orderDetailsContainer">
                                    <div className="orderValues">
                                        <div className="orderKey">
                                            <div>Card No</div>
                                            <div>Name</div>
                                            <div>Mobile</div>
                                        </div>
                                        <div className="orderValuesCol">
                                            <div>:</div>
                                            <div>:</div>
                                            <div>:</div>
                                        </div>
                                        <div>
                                            <div>{item.wholeDetails.cardNumber}</div>
                                            <div>{item.wholeDetails.userName}</div>
                                            <div>{item.wholeDetails.mobile_number}</div>
                                        </div>
                                    </div>
                                    <div className="orderValues">
                                        <div className="orderKey">
                                            <div>Order No</div>
                                            <div>Order Dt</div>
                                        </div>
                                        <div className="orderValuesCol">
                                            <div>:</div>
                                            <div>:</div>
                                        </div>
                                        <div>
                                            <div>{item.wholeDetails.orderNumber}</div>
                                            <div>{moment(item.wholeDetails.orderDate).format("DD/MM/yyyy")}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="printtable">
                                    <table style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Index</th>
                                                <th>Item Description</th>
                                                <th>Qty</th>
                                                <th>Rate+TAX</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        {item.normalProduct.map((data, index) => {
                                            return (
                                                <>
                                                    {/* <tbody> */}
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{data.indexNumber}</td>
                                                        <td>{data.product}</td>
                                                        <td>{data.productQty}</td>
                                                        <td>{data.productRate.toString().includes(".") ? data.productRate : data.productRate + ".00"}</td>
                                                        <td>{data.productAmount.toString().includes(".") ? data.productAmount : data.productAmount + ".00"}</td>

                                                    </tr>
                                                    {/* <tr></tr>
                                                <tr></tr>
                                                <tr></tr>
                                                <tr></tr> */}
                                                    {/* </tbody> */}
                                                    {(index + 1) === item.normalProduct.length &&
                                                        <tr ><td></td><td></td><td></td><td></td><td></td><td style={{ whiteSpace: 'nowrap' }}><div style={{ marginTop: "80px", marginBottom: "0px" }}>Convenience Fee 10</div></td></tr>
                                                    }
                                                    {/* <tr><div style={{width:"100%",paddingLeft:"50px",marginTop:"30px",display:"flex",justifyContent:"flex-end"}}>Convenience Fee 10</div></tr> */}
                                                    {/* {orderDetailsLength === index + 1 && <tfoot>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>{item.orderTotalAmount}</td>
                                                        </tr>
                                                    </tfoot>} */}
                                                </>
                                            )

                                        })}

                                    </table>

                                </div>
                                {/* </div>} */}
                            </div></>}





                            {item.liquorProduct.length > 0 &&
                                <div className="liquorHeader">
                                    <div className="canteenDetails">
                                        <div>Golden Palm Canteen</div>
                                        <div>Chennai</div>
                                        <div>Liquor</div>
                                    </div>
                                    <div className="orderDetailsContainer">
                                        <div className="orderValues">
                                            <div className="orderKey">
                                                <div>Card No</div>
                                                <div>Name</div>
                                                <div>Mobile</div>
                                            </div>
                                            <div className="orderValuesCol">
                                                <div>:</div>
                                                <div>:</div>
                                                <div>:</div>
                                            </div>
                                            <div>
                                                <div>{item.wholeDetails.cardNumber}</div>
                                                <div>{item.wholeDetails.userName}</div>
                                                <div>{item.wholeDetails.mobile_number}</div>
                                            </div>
                                        </div>
                                        <div className="orderValues">
                                            <div className="orderKey">
                                                <div>Order No</div>
                                                <div>Order Dt</div>
                                            </div>
                                            <div className="orderValuesCol">
                                                <div>:</div>
                                                <div>:</div>
                                            </div>
                                            <div>
                                                <div>{item.wholeDetails.orderNumber}</div>
                                                <div>{moment(item.wholeDetails.orderDate).format("DD/MM/yyyy")}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="printtable">
                                        <table style={{ width: "100%" }}>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Index</th>
                                                <th>Item Description</th>
                                                <th>Qty</th>
                                                <th>Rate+TAX</th>
                                                <th>Amount</th>
                                            </tr>
                                            {item.liquorProduct.map((liquorData, index) => {

                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{liquorData.indexNumber}</td>
                                                            <td>{liquorData.product}</td>
                                                            <td>{liquorData.productQty}</td>
                                                            <td>{liquorData.productRate.toString().includes(".") ? liquorData.productRate : liquorData.productRate + ".00"}</td>
                                                            <td>{liquorData.productAmount.toString().includes(".") ? liquorData.productAmount : liquorData.productAmount + ".00"}</td>
                                                        </tr>
                                                    </>
                                                )
                                            })}

                                        </table>
                                    </div>
                                </div>
                            }

                        </div>
                    )
                })}
                {/* {this.state.productDetails.map((item) => {
                    const alltrue = item.orderDetails.every((alltr) => {
                        return alltr.category_id !== 5
                    })
                    if (!alltrue) {
                        return (
                            <div className="printContainer liquorContainer">
                                <div className="printtable">
                                    <table style={{ width: "100%" }}>
                                        <tr>
                                            <th>Index</th>
                                            <th>Item Description</th>
                                            <th>Qty</th>
                                            <th>Rate+TAX</th>
                                            <th>Amount</th>
                                        </tr>
                                        {item.orderDetails.map((data) => {
                                            if (data.category_id === 5) {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{data.indexNumber}</td>
                                                            <td>{data.product}</td>
                                                            <td>{data.productQty}</td>
                                                            <td>{data.productRate}</td>
                                                            <td>{data.productAmount}</td>
                                                        </tr>
                                                    </>
                                                )
                                            }
                                        })}
                                    </table>
                                </div>
                            </div>
                        )
                    }
                })} */}
            </div>

        );
    }
}
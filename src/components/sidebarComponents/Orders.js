import React, { useState, useEffect } from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableComponent from "../tableComponent/TableComponent";
import { useDispatch, connect } from "react-redux";
import { getOrdersList } from "../../actions/orders";
import '../../App.css';


const Orders = ({ orders, allDetails }) => {

    const [showOrder, setShowOrder] = useState(true)
    const [showIndividualOrder, setIndividualOrder] = useState(false)

    const [orderView, setOrderView] = useState({})
    const [orderDetails, setOrderDetails] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrdersList())
    }, [dispatch])

    const modelopen = (e, id) => {

        let orderDetails = [];
        const individualOrder = allDetails && allDetails.length > 0 && allDetails.find(data => data.orderId === id)

        setOrderView(individualOrder)

        console.log("individualOrder", individualOrder)
        individualOrder.orderDetails.length > 0 && individualOrder.orderDetails.map((order) => {
            const { indexNumber, categoryName, subCategoryName, product, productAmount, orderDetailId, productRate, productQty } = order;

            orderDetails.push({
                indexno: indexNumber,
                // categoryName,
                // subCategoryName,
                productname: product,
                quantity: productQty,
                rate: productRate.toFixed(2),
                amount: productAmount.toFixed(2),
                id: orderDetailId
            })
        })

        setOrderDetails(orderDetails)
        setShowOrder(false)
        setIndividualOrder(true)
    }


    const changeView = () => {
        setIndividualOrder(false)
        setShowOrder(true)
    }

    const getrangeDate = (data) => {
        dispatch(getOrdersList({ startDate: data.startDate, endDate: data.endDate }))
    }

    return (
        <div className="main-content">
            <TableHeader title={showOrder ? "Orders" : "Order view"} showDatePicker={showOrder ? true : false} showIndividualOrder={showIndividualOrder} orderView={orderView} changeView={changeView} getrangeDate={(data) => { getrangeDate(data) }} />

            <div className="main-content-details">
                {showOrder && <TableComponent
                    heading={[
                        { id: "", label: "S.No" },
                        { id: "orderId", label: "Order Id" },
                        { id: "orderDate", label: "Order Date" },
                        { id: "cardNumber", label: "Card Number" },
                        { id: "userName", label: "Customer Name" },
                        { id: "orderTotalAmount", label: "Total Amount (₹)" },
                        { id: "", label: "Action" }
                    ]}
                    rowdata={orders && orders.length > 0 ? orders : []}
                    // actionclose="close"
                    DeleteIcon="close"
                    EditIcon="close"
                    checkbox="close"
                    UploadIcon="close"
                    GrandTotal="close"
                    Workflow="close"
                    modelopen={(e, id) => modelopen(e, id)}
                    // props_loading={this.state.props_loading}
                    specialProp={true}
                    tableRowCss={"orderTableRowCss"}
                />}
                {showIndividualOrder &&
                    <TableComponent
                        heading={[
                            { id: "", label: "S.No" },
                            { id: "indexno", label: "Index Number" },
                            // { id: "category", label: "Category" },
                            // { id: "subcategory", label: "Sub Category" },
                            { id: "productname", label: "Product Name" },
                            { id: "quantity", label: "Quantity" },
                            { id: "rate", label: "Rate" },
                            { id: "amount", label: "Amount (₹)" },
                        ]}
                        tableRowCss={"orderIndiTableRowCss"}
                        rowdata={orderDetails && orderDetails.length > 0 ? orderDetails : []}
                        actionclose="close"
                        DeleteIcon="close"
                        EditIcon="close"
                        checkbox="close"
                        UploadIcon="close"
                        GrandTotal="close"
                        Workflow="close"
                        modelopen={(e, id) => modelopen(e, id)}
                        // props_loading={this.state.props_loading}
                        specialProp={true}
                    />
                }
            </div>
        </div>

    )
}


const mapStateToProps = state => ({
    orders: state.orders.orders,
    allDetails: state.orders.allDetails
})

export default connect(mapStateToProps)(Orders);
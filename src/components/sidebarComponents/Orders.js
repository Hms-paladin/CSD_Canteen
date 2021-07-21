import React, { useState, useEffect } from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableComponent from "../tableComponent/TableComponent";
import { useDispatch, connect } from "react-redux";
import { getOrdersList } from "../../actions/orders";
import '../../App.css';
import { Input } from 'antd'
const { Search } = Input;

const Orders = ({ orders, allDetails }) => {

    const [showOrder, setShowOrder] = useState(true)
    const [showIndividualOrder, setIndividualOrder] = useState(false)

    const [orderView, setOrderView] = useState({})
    const [orderDetails, setOrderDetails] = useState([])
    const [filterData, setFilterData] = useState(orders)
    const [searchBox, setSearchBox] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrdersList())
    }, [dispatch])
    useEffect(() => {
        setFilterData(orders)
    }, [orders])

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


    console.log("props", orders)

    const onSearch = (e) => {
        console.log(e.target.value, "Search_data")
        setSearchBox(e.target.value)
        const productSearch = orders.filter((data) => {
            console.log(data, "Search_data")
            if (e.target.value === null)
                return data

            else if (data.orderId !== null && data.orderId.toString().toLowerCase().includes(e.target.value.toLowerCase())
                || (data.cardNumber != null && data.cardNumber.toString().toLowerCase().includes(e.target.value.toLowerCase()))
                || (data.orderDate != null && data.orderDate.toString().toLowerCase().includes(e.target.value.toLowerCase()))
                || (data.orderTotalAmount != null && data.orderTotalAmount.toString().toLowerCase().includes(e.target.value.toLowerCase()))
                || (data.userName != null && data.userName.toString().toLowerCase().includes(e.target.value.toLowerCase()))
            ) {
                return data
            }
        })
        setSearchBox(e.target.value)
        setFilterData(productSearch)
        console.log(filterData, "filterData");

    }



    console.log(searchBox, "test")
    console.log(orders, "orders")
    console.log(filterData, "filterData");
    return (
        <div className="main-content">
            <TableHeader title={showOrder ? "Orders" : "Order view"} showDatePicker={showOrder ? true : false} showIndividualOrder={showIndividualOrder} orderView={orderView} changeView={changeView} getrangeDate={(data) => { getrangeDate(data) }} />
            {showOrder &&<div style={{ margin: 28 }}>
                <label style={{ fontSize: 17 }}>Order Search</label>
                <div>
                    <Search placeholder="Input search text" onChange={(e) => onSearch(e)} value={searchBox} style={{ width: 240, marginTop: 13 }} />
                </div>
            </div>}
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
                    rowdata={filterData && filterData.length > 0 ? filterData : []}
                    // actionclose="close"sssss
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
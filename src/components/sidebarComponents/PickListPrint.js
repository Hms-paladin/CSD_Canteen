import React, { useState, useEffect, useRef } from "react";
import TableHeader from "../tableHeader/TableHeader";
import TableComponent from "../tableComponent/TableComponent";
import { useDispatch, connect } from "react-redux";
import { getPrintListData } from "../../actions/picklistprint";
import Modalcomp from "../helpers/modalcomp/ModalComp"
import Checkbox from '@material-ui/core/Checkbox';
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";
import Button from '@material-ui/core/Button';
import moment from 'moment';
import "./ComponentToprint.css";
import { Input } from 'antd'
const { Search } = Input;

const PickListPrint = ({ orders, allDetails }) => {


    const [showList, setShowList] = useState(true)
    const [printView, setPrintView] = useState(false)
    const [checkstate, setCheckState] = useState(false)

    const [showIndividual, setIndividual] = useState(false)

    const [ListView, setListView] = useState({})
    const [ListDetails, setListDetails] = useState([])
    const [orderDetailsList, setOrderDetailsList] = useState([])
    const [selectedPrintedId, setSelectedPrintedId] = useState([]);
    const [checkList, setCheckedList] = useState({})
    const [test, setTest] = useState(true)
    const [productDetails, setProductDetails] = useState([])
    const [getOrderDate, setGetOrderDate] = useState()
    const [check, setCheck] = useState(1)
    const [uncheck, setUnCheck] = useState(1)
    const [id, setid] = useState()
    const pageStyle = `{ size: 10*15cm}`;
    const [searchBox, setSearchBox] = useState(null)
    const [filterData, setFilterData] = useState(orders)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPrintListData())
    }, [])
    useEffect(() => {
        setFilterData(orders)
    }, [orders])

    const modelopen = (e, id) => {

        let ListDetails = [];
        const individualOrder = allDetails && allDetails.length > 0 && allDetails.find(data => data.orderId === id)

        setListView(individualOrder)

        console.log("individualOrder", individualOrder)
        individualOrder.ListDetails.length > 0 && individualOrder.ListDetails.map((order) => {
            const { indexNumber, categoryName, subCategoryName, product, productAmount, orderDetailId } = order;

            ListDetails.push({
                indexNumber,
                categoryName,
                subCategoryName,
                product,
                productAmount,
                id: orderDetailId
            })
        })

        setListDetails(ListDetails)
        setShowList(false)
        setIndividual(true)
    }


    const changeView = () => {
        setIndividual(false)
        setShowList(true)
    }

    const getrangeDate = (data) => {
        dispatch(getPrintListData(data.startDate, data.endDate))
    }


    // const handleCheck = (event, indexId,i) => {
    //     setid(i)
    //     console.log(orderDetailsList,i,"ordersssss")
    //     // orderDetailsList[i].print=<Checkbox onClick={(event) => handleCheck(event, orderDetailsList[i].orderid,i)} name={"checked" + orderDetailsList[i].orderid} checked={true} value={true} />
    //     if (selectedPrintedId.includes(indexId)) {
    //         setUnCheck(prevState => ({
    //             ...prevState
    //         }))
    //         selectedPrintedId.map((data, index) => {
    //             if (data === indexId) {
    //                 selectedPrintedId.splice(index, 1);
    //                 productDetails.splice(index, 1)
    //             }
    //         })
    //         setCheckedList(
    //             prevState => ({
    //                 ...prevState,
    //                 [event.target.name]: false,
    //             })
    //         )


    //     } else {
    //         selectedPrintedId.push(indexId)
    //         setCheckedList(
    //             prevState => ({
    //                 ...prevState,
    //                 [event.target.name]: true,
    //             })
    //         )
    //         setCheck(prevState => ({
    //             ...prevState
    //         }))
    //         const individualOrder = allDetails && allDetails.length > 0 && allDetails.find(data => data.orderId === indexId)

    //         console.log(individualOrder, "individualOrder")
    //         const normalProduct = []
    //         const liquorProduct = []

    //         individualOrder.orderDetails.map((list) => {
    //             if (list.category_id !== 5) {
    //                 normalProduct.push(list)
    //             } else {
    //                 liquorProduct.push(list)
    //             }
    //         })

    //         productDetails.push({ normalProduct, liquorProduct, wholeDetails: individualOrder })
    //     }
    //     setTest(!test)

    // }



    const printviewModelOpen = (name, id) => {
        let orderDetailsArr = [];
        let clickedDate = null

        allDetails.filter((date) => {
            if (date.orderId === id) {
                clickedDate = date.orderDate
                setGetOrderDate(date.orderDate)
            }
        })

        allDetails.map((order, index) => {
            if (order.orderDate === clickedDate) {
                console.log(checkList["checked" + order.orderId], "kkkkkkkkkkkkk")
                orderDetailsArr.push({
                    orderid: order.orderId,
                    cardno: order.cardNumber,
                    name: order.userName,
                    totalamount: order.orderTotalAmount,
                    // print: <Checkbox onClick={(event) => handleCheck(event, order.orderId,index)} name={"checked" + order.orderId} checked={checkList["checked" + order.orderId]} value={checkList["checked" + order.orderId]} />,
                    id: order.orderId
                })
            }
        })

        setOrderDetailsList(orderDetailsArr)
        setPrintView(true)
    }

    const componentRef = useRef();

    const closemodelFunc = () => {
        setPrintView(false)
        setCheckedList([])
        setSelectedPrintedId([])
        setProductDetails([])
    }

    const handleCheck = (indexId, id) => {
        console.log(indexId, id, "checkkkkk")
        if (selectedPrintedId.includes(indexId)) {

            selectedPrintedId.map((data, index) => {
                if (data === indexId) {
                    selectedPrintedId.splice(index, 1);
                    productDetails.splice(index, 1)
                }
            })


        } else {
            selectedPrintedId.push(indexId)

            const individualOrder = allDetails && allDetails.length > 0 && allDetails.find(data => data.orderId === indexId)

            console.log(individualOrder, "individualOrder")
            const normalProduct = []
            const liquorProduct = []

            individualOrder.orderDetails.map((list) => {
                if (list.category_id !== 5) {
                    normalProduct.push(list)
                } else {
                    liquorProduct.push(list)
                }
            })

            productDetails.push({ normalProduct, liquorProduct, wholeDetails: individualOrder })
        }
        console.log(productDetails, "productDetails")
        setTest(!test)
    }

    const onSearch = (e) => {
        console.log(e.target.value, "Search_data")
        setSearchBox(e.target.value)
        console.log(orders,"orders")
        const productSearch = orders.filter((data) => {
            console.log(data, "Search_data")
            if (e.target.value === null)
                return data

            else if (data.numberoforder !== null && data.numberoforder.toString().toLowerCase().includes(e.target.value.toLowerCase())
                || (data.orderDate != null && data.orderDate.toString().toLowerCase().includes(e.target.value.toLowerCase()))
            ) {
                return data
            }
        })
        setSearchBox(e.target.value)
        setFilterData(productSearch)
        // console.log(filterData, "filterData");

    }

    console.log(orders,filterData, "orderDetailsList")
    console.log(checkstate, selectedPrintedId, test, "checkList")

    return (
        <div className="main-content">
            <TableHeader title={showList ? "Pick List" : "Pick List view"} showDatePicker={showList ? true : false} showIndividualOrder={showIndividual} orderView={ListView} changeView={changeView} getrangeDate={(data) => { getrangeDate(data) }} />

            <div style={{ margin: 28 }}>
                <label style={{ fontSize: 17 }}>PickList Search</label>
                <div>
                    <Search placeholder="input search text" onChange={(e) => onSearch(e)} value={searchBox} style={{ width: 240, marginTop: 13 }} />
                </div>
            </div>

            <div className="main-content-details">
                {showList && <TableComponent
                    heading={[
                        { id: "", label: "S.No" },
                        { id: "date", label: "Order Date" },
                        { id: "numberoforder", label: "Number Of Orders" },
                        { id: "", label: "Action" }
                    ]}
                    rowdata={filterData && filterData.length > 0 ? filterData : []}
                    // rowdata={orders && orders.length > 0 ? orders : []}
                    // actionclose="close"
                    DeleteIcon="close"
                    EditIcon="close"
                    checkbox="close"
                    UploadIcon="close"
                    GrandTotal="close"
                    Workflow="close"
                    modelopen={(e, id) => printviewModelOpen(e, id)}
                    // props_loading={this.state.props_loading}
                    specialProp={true}
                    tableRowCss={"PLTableRowCss"}
                />}

                {showIndividual &&
                    <TableComponent
                        heading={[
                            { id: "", label: "S.No" },
                            { id: "indexno", label: "Index Number" },
                            { id: "category", label: "Category" },
                            { id: "subcategory", label: "Sub Category" },
                            { id: "productname", label: "Product Name" },
                            { id: "amount", label: "Amount (₹)" },
                        ]}
                        rowdata={ListDetails && ListDetails.length > 0 ? ListDetails : []}
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
                <Modalcomp title={"Pick List for" + " " + moment(getOrderDate).format("DD-MM-yyyy")} visible={printView} closemodal={() => closemodelFunc()}>
                    <ReactToPrint 
                        trigger={() => <div className="printBtn"><Button disabled={productDetails.length > 0 ? false : true} variant="contained" color="primary">
                            print
                        </Button></div>}
                        content={() => componentRef.current}
                    // onAfterPrint={()=>setProductDetails([])}
                    />
                    <TableComponent
                        heading={[
                            { id: "", label: "S.No" },
                            { id: "orderid", label: "Order Id" },
                            { id: "cardno", label: "Card No" },
                            { id: "name", label: "Name" },
                            { id: "totalamount", label: "Total Amount(₹)" },
                            { id: "", label: "" },
                            { id: "print", label: "Print" },
                        ]}
                        rowdata={orderDetailsList}
                        tablemasterclass={"pickListTableContainer"}
                        tableRowCss={"pickListTableRowCss"}
                        // actionclose="close"
                        DeleteIcon="close"
                        EditIcon="close"
                        checkbox={true}
                        UploadIcon="close"
                        GrandTotal="close"
                        Workflow="close"
                        VisibilityIcon="close"
                        specialProp={true}
                        CheckItems={handleCheck}
                    />
                    <ReactToPrint
                        trigger={() => <div className="printBtn"><Button disabled={productDetails.length > 0 ? false : true} variant="contained" color="primary">
                            print
                        </Button></div>}
                        content={() => componentRef.current}
                    // onAfterPrint={()=>setProductDetails([])}
                    />
                    <div><ComponentToPrint ref={componentRef} productDetails={productDetails} /></div>
                </Modalcomp>
            </div>
        </div>

    )
}


const mapStateToProps = state => ({
    orders: state.picklistprint.picklistdata,
    allDetails: state.picklistprint.list_details
})

export default connect(mapStateToProps)(PickListPrint);
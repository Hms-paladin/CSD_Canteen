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
import "./ComponentToprint.css";


const PickListPrint = ({ orders, allDetails }) => {


    const [showList, setShowList] = useState(true)
    const [printView, setPrintView] = useState(false)


    const [showIndividual, setIndividual] = useState(false)

    const [ListView, setListView] = useState({})
    const [ListDetails, setListDetails] = useState([])
    const [orderDetailsList, setOrderDetailsList] = useState([])
    const [selectedPrintedId, setSelectedPrintedId] = useState([]);
    const [checkList, setCheckedList] = useState({})
    const [test, setTest] = useState(true)
    const [productDetails, setProductDetails] = useState([])




    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPrintListData())
    }, [])

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


    const handleCheck = (event, indexId) => {
        if (selectedPrintedId.includes(indexId)) {
            selectedPrintedId.map((data, index) => {
                if (data === indexId) {
                    selectedPrintedId.splice(index, 1);
                    productDetails.splice(index, 1)
                }
            })
            setCheckedList(
                prevState => ({
                    ...prevState,
                    [event.target.name]: false,
                })
            )

        } else {
            selectedPrintedId.push(indexId)
            setCheckedList(
                prevState => ({
                    ...prevState,
                    [event.target.name]: true,
                })
            )
            const individualOrder = allDetails && allDetails.length > 0 && allDetails.find(data => data.orderId === indexId)

            console.log(individualOrder,"individualOrder")
                const normalProduct = []
                const liquorProduct = []

            individualOrder.orderDetails.map((list)=>{
                if(list.category_id !== 5){
                    normalProduct.push(list)
                }else{
                    liquorProduct.push(list)
                }
            })

            productDetails.push({normalProduct,liquorProduct,wholeDetails:individualOrder})
        }
        setTest(!test)
    }


    const printviewModelOpen = (name, id) => {
        let orderDetailsArr = [];
        // const individualOrder = allDetails && allDetails.length > 0 && allDetails.find(data => data.orderId === id)
        allDetails.map((order, index) => {
            orderDetailsArr.push({
                orderid: order.orderId,
                cardno: order.cardNumber,
                name: order.userName,
                totalamount: order.orderTotalAmount,
                print: <Checkbox onClick={(event) => handleCheck(event, order.orderId)} name={"checked" + order.orderId}
                    checked={checkList["checked" + order.orderId]} value={checkList["checked" + order.orderId]} />,
                id: order.orderId
            })
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

    return (
        <div className="main-content">
            <TableHeader title={showList ? "Pick List" : "Pick List view"} showDatePicker={showList ? true : false} showIndividualOrder={showIndividual} orderView={ListView} changeView={changeView} getrangeDate={(data) => { getrangeDate(data) }} />

            <div className="main-content-details">
                {showList && <TableComponent
                    heading={[
                        { id: "", label: "S.No" },
                        { id: "date", label: "Order Date" },
                        { id: "numberoforder", label: "Number Of Orders" },
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
                    modelopen={(e, id) => printviewModelOpen(e, id)}
                    // props_loading={this.state.props_loading}
                    specialProp={true}
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
                <Modalcomp title="Pick List Print View" visible={printView} closemodal={() => closemodelFunc()}>
                    <TableComponent
                        heading={[
                            { id: "", label: "S.No" },
                            { id: "orderid", label: "Order Id" },
                            { id: "cardno", label: "Card No" },
                            { id: "name", label: "Name" },
                            { id: "totalamount", label: "Total Amount(₹)" },
                            { id: "print", label: "Print" }
                        ]}
                        rowdata={orderDetailsList}
                        // actionclose="close"
                        DeleteIcon="close"
                        EditIcon="close"
                        checkbox="close"
                        UploadIcon="close"
                        GrandTotal="close"
                        Workflow="close"
                        VisibilityIcon="close"
                        specialProp={true}
                    />
                    <ReactToPrint
                        trigger={() => <div className="printBtn"><Button disabled={productDetails.length > 0 ? false :true} variant="contained" color="primary">
                            print
                      </Button></div>}
                        content={() => componentRef.current}
                    // onAfterPrint={()=>setProductDetails([])}
                    />
                    <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} productDetails={productDetails} /></div>
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
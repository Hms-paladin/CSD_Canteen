import React, { useState, useEffect } from "react";
import TableHeader from "../tableHeader/TableHeader"
import TableComponent from "../tableComponent/TableComponent";
import Modalcomp from "../helpers/modalcomp/ModalComp";
import Productview from "../Product/productview";
import Productedit from "../Product/productedit";
import { useDispatch, connect } from "react-redux";
import { getProductDetails } from "../../actions/products";
import { getSubCategory } from "../../actions/products";
import CSVUpload from "./csvUpload/CSVUpload.js";
import { Input, Space } from 'antd';

const { Search } = Input;


const ProductManagement = ({ products, allproducts }) => {


    const [viewModal, setViewModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [productView, setProductView] = useState(false)
    const [filterData, setFilterData] = useState(products)
    const [searchBox, setSearchBox] = useState(null)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetails())
        // onSearch()
    }, [])


    const modelopen = (data, id) => {

        let productView = allproducts && allproducts.length > 0 && allproducts.find(prod => prod.productId === id)
        setProductView(productView)

        if (data === "view") {

            setViewModal(true)
        }

        if (data === "edit") {
            setEditModal(true)
        }
    }




    const handleClose = () => {
        setViewModal(false)
        setEditModal(false)
    }

    const onSearch = (e) => {
        const productSearch = products.filter((data) => {
            console.log(data, "Search_data")
            if (e.target.value === null)
                return data

            else if (data.indexNumber !== null && data.indexNumber.toLowerCase().includes(e.target.value.toLowerCase())
                || (data.categoryName != null && data.categoryName.toLowerCase().includes(e.target.value.toLowerCase()))
                || (data.subCategoryName != null && data.subCategoryName.toLowerCase().includes(e.target.value.toLowerCase()))
                || (data.productName != null && data.productName.toLowerCase().includes(e.target.value.toLowerCase()))
            ) {
                return data
            }
        })
        setSearchBox(e.target.value)
        setFilterData(productSearch)
    }

    return (
        <div className="main-content">
            <TableHeader title="Product" />
            <div style={{ margin: 28 }}>
                <label style={{ fontSize: 17 }}>Product Search</label>
                <div>
                    <Search placeholder="input search text" onChange={onSearch} value={searchBox} style={{ width: 240, marginTop: 13 }} />
                </div>
            </div>

            <div className="main-content-details">
                <TableComponent
                    heading={[
                        { id: "", label: "S.No" },
                        { id: "indexNumber", label: "Product Id" },
                        { id: "categoryName", label: "Category" },
                        { id: "subCategoryName", label: "SubCategory" },
                        { id: "productName", label: "Product Name" },
                        { id: "", label: "Action" }
                    ]}
                    rowdata={filterData && filterData.length > 0 ? filterData : []}
                    // actionclose="close"
                    DeleteIcon="close"
                    UploadIcon="close"
                    GrandTotal="close"
                    Workflow="close"
                    checkbox="close"
                    pdfDownload="close"

                    modelopen={(e, id) => modelopen(e, id)}
                    // props_loading={this.state.props_loading}
                    specialProp={true}
                />
            </div>

            {viewModal && <Modalcomp xswidth={"md"} clrchange="textclr" title="Product View" visible={viewModal} closemodal={handleClose} >

                <Productview productView={productView} />
            </Modalcomp>}

            {editModal && <Modalcomp xswidth={"md"} clrchange="textclr" title="Product Edit" visible={editModal} closemodal={handleClose}>
                <Productedit productView={productView} closemodal={handleClose} />
            </Modalcomp>}

        </div>
    )
}

const mapStateToProps = state => ({
    products: state.products.products,
    allproducts: state.products.allproducts,
    getSubCategory: state.products.productSubCategory
})

export default connect(mapStateToProps)(ProductManagement);
import React from "react";
import TableHeader from "../tableHeader/TableHeader"
import TableComponent from "../tableComponent/TableComponent";
import { Input, Button } from 'antd';
import Labelbox from "../helpers/labelbox/labelbox";
import ViewImageModal from "../helpers/ViewImageModal/ViewImageModal";
import { connect } from "react-redux";
import { getNewArrivals, getCategory, getSubCategory } from "../../actions/newarrival"
import CancelIcon from '@material-ui/icons/Cancel';
import axios from "axios";
import apiurl from "../../utils/baseUrl";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';

import '../../App.css';

const { Search } = Input;

class Newarrival extends React.Component {

    state = {
        viewModal: false,
        clickedId: 0,
        categoryDrop: [],
        subCategoryDrop: [],
        searchValue: "",
        categoryValue: "",
        subCategoryValue: "",
        categoryValueByName: "",
        subCategoryValueByName: "",
        newarrival: [],
        searchdata: []
    }

    //  Backdrop
    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
        this.props.dispatch(getNewArrivals())
        // this.props.dispatch(getCategory())
        // this.props.dispatch(getSubCategory())
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick = (e) => {
        this.handleClickOutside();
    }

    handleClickOutside = () => {
        this.setState({ viewModal: false })
    }

    componentDidMount() {
        let newarrival = [];

        this.props.newarrival.map((data) => {
            const { indexNumber, productName, productId } = data;
            newarrival.push({
                indexNumber,
                productName,
                action: <DeleteIcon className="arrivalDelete_icon" />,
                id: productId
            })
        })

        this.setState({ newarrival: newarrival, searchdata: newarrival })

    }

    UNSAFE_componentWillReceiveProps() {
        const optCategory = []
        const optSubCategory = []

        this.props.subCategory.map((data) => {
            optCategory.push({ value: data.category, id: data.categoryId })
        })

        this.setState({ categoryDrop: optCategory })

        //    ?.subCategorylist.map((data)=>{return{id:data.subCategoryId,value:data.subCategory}})
    }

    modelopen = (e, id) => {
        this.setState({ viewModal: true, clickedId: id })
    }

    handleChangeCate = (data) => {
        this.setState({ categoryValue: data })

        this.props.subCategory.find((list) => {
            if (list.categoryId === data) {
                const subCategoryOption = []
                list.subCategoryList.map((item) => {
                    subCategoryOption.push({ id: item.subCategoryId, value: item.subCategory })
                })
                this.setState({ subCategoryDrop: subCategoryOption, subCategoryValue: "", categoryValueByName: list.category })
            }
        })
    }

    handleChangeSubCate = (data) => {
        this.state.subCategoryDrop.find((item) => {
            if (item.id === data) {
                this.setState({ subCategoryValueByName: item.value })
            }
        })
        this.setState({ subCategoryValue: data })
    }

    clearFilter = () => {
        this.setState({
            searchValue: "",
            categoryValue: "",
            subCategoryValue: "",
            categoryValueByName: "",
            subCategoryValueByName: "",
            subCategoryDrop: []
        })
    }

    addArrival = (id) => {
            axios.post(apiurl + 'addNewArraivalListWeb', {
                "productId": id,
                "adminUserId": 1
            })
            .then(() => {
                this.handleSearch()
            })
    }

    deleteArrival = (id) => {
        axios.post(apiurl + 'deleteNewArraivalListWeb', {
            "productId": id,
            "newArrivalId":id
        })
        .then(() => {
            this.handleSearch()
        })
}

    handleSearch = () => {

        // console.log(JSON.parse(localStorage.getItem('user')).adminId,"getItem")

        const self = this

        axios.post(apiurl + 'commonProductSearch', {
            "searchContent": this.state.searchValue,
            "userId": 2,
            "limit": 10000000,
            "pageno": 1
        })
            .then(function (response) {
                const searchdata = []
                if (response.data.status === 1) {
                    response.data.data[0].details.filter((data, index) => {
                        searchdata.push({
                            indexNumber: data.indexNumber,
                            productName: data.productName,
                            action: <AddIcon className="arrivalAdd_icon" onClick={() => self.addArrival(data.productId)} />,
                            id: data.productId

                        })
                    })
                    self.setState({ searchdata: searchdata })
                } else if (self.state.searchValue === "") {
                    self.setState({ searchdata: self.state.newarrival })
                }
                else {
                    self.setState({ searchdata: [] })
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        console.log(this.state.searchdata, "tablerowarrival")
        return (
            <div className="main-content" ref="node">

                <TableHeader title="New Arrival" />

                <div className="main-content-details">
                    <div className="newarrival_table">

                        <Input placeholder="Search" enterButton onChange={(e) => this.setState({ searchValue: e.target.value })} value={this.state.searchValue} />
                        <Button type="primary" onClick={this.handleSearch}>Search</Button>
                        {/* <div className="drpdwn_flex">
                            <div>
                                <Labelbox type="select" labelname="Category" dropdown={this.state.categoryDrop} changeData={(data)=>this.handleChangeCate(data)} value={this.state.categoryValue} />
                            </div>
                            <div>
                                <Labelbox type="select" labelname="Sub category" value={this.state.subCategoryValue} dropdown={this.state.subCategoryDrop} changeData={(data)=>this.handleChangeSubCate(data)} />
                            </div>
                            <div className="cancelFilterIcon">
                            <CancelIcon onClick={this.clearFilter} />
                            </div>
                        </div> */}
                    </div>


                    <TableComponent
                        heading={[
                            { id: "", label: "S.No" },
                            { id: "indexNumber", label: "Index Number" },
                            // { id: "categoryName", label: "Category" },
                            // { id: "subCategoryName ", label: "Subcategory" },
                            { id: "productName ", label: "Product Name" },
                            { id: "", label: "Action" },

                            // { id: "", label: "Image" },
                            // { id: "newarrival ", label: "New Arrival" },

                        ]}
                        rowdata={this.state.searchdata}
                        // actionclose="close"
                        EditIcon="close"
                        VisibilityIcon="close"
                        DeleteIcon="close"
                        UploadIcon="close"
                        GrandTotal="close"
                        Workflow="close"
                        pdfDownload="close"
                        checkbox="close"
                        modelopen={(e, id) => this.modelopen(e, id)}
                        // props_loading={this.state.props_loading}
                        specialProp={true}
                        viewModal={this.state.viewModal}
                        clickedId={this.state.clickedId}
                        tableRowCss={"ArrivalTableRowCss"}
                    />
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    newarrival: state.newarrival.newarrivals,
    category: state.newarrival.getCategory,
    subCategory: state.newarrival.getSubCategory
})


export default connect(mapStateToProps)(Newarrival);



// const { newarrival } = this.state;
// console.log(this.state.newarrival,!this.state.searchValue, "searchValue")
// || !this.state.categoryValue || !this.state.subCategoryValue
// const searchdata = []
// newarrival.filter((data, index) => {
//     if (!this.state.searchValue
//         && !this.state.categoryValueByName && !this.state.subCategoryValueByName
//     ) {

//         searchdata.push(data)
//     }
//     else if (data.indexNumber && data.indexNumber.toLowerCase().includes(this.state.searchValue.toLowerCase())
//           || data.categoryName && data.categoryName.toLowerCase().includes(this.state.searchValue.toLowerCase()) 
//           || data.subCategoryName && data.subCategoryName.toLowerCase().includes(this.state.searchValue.toLowerCase()) 
//         || data.productName && data.productName.toLowerCase().includes(this.state.searchValue.toLocaleLowerCase())
//     ) {
//         if(data.categoryName.toLowerCase().includes(this.state.categoryValueByName.toLowerCase()) && data.subCategoryName.toLowerCase().includes(this.state.subCategoryValueByName.toLowerCase())){
//         searchdata.push(data)
//         }
//     }
// })
// this.setState({searchdata})
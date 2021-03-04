import React from "react";
import TableHeader from "../tableHeader/TableHeader"
import TableComponent from "../tableComponent/TableComponent";
import { Input } from 'antd';
import Labelbox from "../helpers/labelbox/labelbox";
import ViewImageModal from "../helpers/ViewImageModal/ViewImageModal";
import {connect} from "react-redux";
import {getNewArrivals}  from "../../actions/newarrival"

const { Search } = Input;



class Newarrival extends React.Component {

 

    //  Backdrop
    componentWillMount() {
        document.addEventListener('mousedown',this.handleClick,false)
        this.props.dispatch(getNewArrivals())
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown',this.handleClick,false)
    }

    handleClick = (e) => {
        this.handleClickOutside();
    }

    handleClickOutside = () => {
        this.setState({viewModal:false})
    }

   

    state = {
        viewModal:false,
        clickedId: 0,
        newarrivalData:[
            {
                indexnumber:"Hindi",
                category:"myfile.pdf",
                subcategory:"17 Nov 2020",
                productname:"Hindi",
                id:1
            },
            {
                indexnumber:"Tamil",
                category:"file.pdf",
                subcategory:"12 Nov 2020",
                productname:"Hindi",

                id:2
            },
            {
                indexnumber:"English",
                category:"mydoc.pdf",
                subcategory:"12 Nov 2020",
                productname:"Hindi",

                id:3 
            }
        ]
    }


    modelopen = (e,id) => {
        this.setState({viewModal:true,clickedId:id})
    }


  
 
   
    render() {
        const {newarrival} = this.props;
        return(
            <div className="main-content" ref="node">

                <TableHeader title="New Arrival" />

                <div className="main-content-details">
                <div className="newarrival_table">

                <Search placeholder="Search"  enterButton />
                <div className="drpdwn_flex">
                    <div>
                <Labelbox type="select" labelname="Category" />
                </div>
                <div>
                <Labelbox type="select" labelname="Sub category" />
                </div>

                </div>
                </div>


                <TableComponent
                 heading={[
                    { id: "", label: "S.No" },
                    { id: "indexnumber", label: "Index Number" },
                    { id: "category", label: "Category" },
                    { id: "subcategory ", label: "Subcategory" }, 
                    { id: "productname ", label: "Product Name" }, 
           
                    { id: "", label: "Image" },
                    { id: "newarrival ", label: "New Arrival" },            

                ]}
                rowdata={newarrival && newarrival.length > 0 ? newarrival : []}
                // actionclose="close"
                EditIcon="close"
                // VisibilityIcon="close"
                DeleteIcon="close"
                UploadIcon="close"
                GrandTotal="close"
                Workflow="close"
                pdfDownload="close"
                checkbox="open"
                modelopen={(e,id) => this.modelopen(e,id)}
                // props_loading={this.state.props_loading}
                specialProp={true}    
                viewModal={this.state.viewModal}
                clickedId={this.state.clickedId}
  />
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    newarrival:state.newarrival.newarrivals
})


export default connect(mapStateToProps)(Newarrival);
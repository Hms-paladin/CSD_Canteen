/* eslint-disable jsx-a11y/alt-text */
import React, { Component,useEffect,useState } from 'react'
import image from '../images/panamaram.jpeg'
import './productedit.css'
import { ReactSVG } from 'react-svg'
import edit from '../images/edit.svg'
import tool from '../images/exclamation.svg'
import { Button } from '@material-ui/core'
import {useDispatch,connect} from "react-redux";
import {editProduct} from "../../actions/products"
import Labelbox from "../helpers/labelbox/labelbox";
import {getSubCategory} from "../../actions/products";



const Productedit = ({ productView,closemodal,subCategory=[] }) => {

    const dispatch = useDispatch();

    const [fileName,setFileName] = useState("")
    const [imageData,setImageData] = useState([])
    const [product,setProduct] = useState("")
    const [productError,setProductError] = useState(false)

    useEffect(() => {
        dispatch(getSubCategory(productView.productId))
        console.log(productView,"productView")
    },[])
    

    const uploadFile = (e) => {
    
        if(e.target.files && e.target.files[0].type == "video/mp4") {
            alert("video format not supported")
        }
 
         if(e.target.files.length !== 0 && e.target.files[0].type !== "video/mp4" ){
            setFileName(e.target.files[0].name)
            setImageData(e.target.files[0])
         }
    }

    const updateProduct = () => {
        // if(product){
            dispatch(editProduct(productView.productId,imageData,productView.subCategoryId))
            closemodal()
        // }else{
        //     setProductError(true)
        // }
    }

    const handleChange = (data) =>{
        setProduct(data)
        setProductError(false)
    }

    useEffect(()=>{
        // console.log(,"getSubCategory")
    })

    console.log(subCategory,"subCategory")

    return(
        <div className="productedit_flex">
        <div className="imagecontedit"> 
        <div className="prolabel">Product image
        <div className="tooltip-on-hover">
                <ReactSVG className="toolicon" src={tool} /></div>
                <div className="tooltip">
                    <div style={{display:"flex",alignItems:'center'}}><div className="dots"></div><div>Please upload image in JPG or PNG format</div></div>
                    <div style={{display:"flex",alignItems:'center'}}><div className="dots"></div><div>Min size 50kb(200*300 pixels)</div></div>
                    <div style={{display:"flex",alignItems:'center'}}><div className="dots"></div><div>Max size 100kb(200*300 pixels)</div></div>
                </div>
        </div>

       
        <div className="editimage">
             <ReactSVG className="editicon" src={edit} onClick={() => document.getElementById("fileupload").click()}  />
            <img className="proimg" src={fileName !== "" ? URL.createObjectURL(imageData) : productView ? productView.productMedia : null } alt="productimage"  />

            {/* upload  */}
            <input type="file" id={"fileupload"} onChange={(e) => uploadFile(e)} className="hideFile" onClick={(e) => e.currentTarget.value = null }  />
        </div>

        </div>
        <div className="productdetail">
            <div className="productdetailleft">
                <div className="heads">Index Number</div>
                <div>{productView && productView.indexNumber}</div>
                <div className="heads">Category</div>
                <div>{productView && productView.categoryName}</div>
                <Button className="cancelbtn">Cancel</Button>

            </div>
            <div className="productdetailright">
            <div className="heads">Product Name</div>
                <div>{productView && productView.productName}</div>
                <div className="heads">Sub Category</div>
                <div>{productView && productView.subCategoryName}</div>
                {/* <Labelbox type="select"
                 changeData={(data) => handleChange(data)}
                 value={product}
                 error={productError}
                 errmsg={productError && "Field Required"}
                 dropdown={
                      subCategory.map((data)=>{
                    return ({id:data.id,value:data.product_subcategory})
                })
            }
                  /> */}
                <Button className="submitbtn" onClick={() => updateProduct()}>Submit</Button>

            </div>
           <div>
              

           </div>
        </div>

    </div>
    )
}


const mapStateToProps = state => ({
    subCategory:state.products.productSubCategory
})

export default connect(mapStateToProps)(Productedit);
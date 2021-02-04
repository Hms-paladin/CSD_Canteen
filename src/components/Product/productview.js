/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import image from '../images/panamaram.jpeg'
import './productview.css'


const Productview = ({ productView }) => {
    return(
        <div className="productview_flex">

        <div className="imagecont"> 
        <img className="proimg" src={productView && productView.productMedia}/></div>
        <div className="productdetail">
            <div className="productdetailleft">
                <div className="heads">Index Number</div>
                <div>{productView && productView.indexNumber}</div>
                <div className="heads">Category</div>
                <div>{productView && productView.categoryName}</div>

            </div>
            <div className="productdetailright">
            <div className="heads">Product Name</div>
                <div>{productView && productView.productName}</div>
                <div className="heads">Sub Category</div>
                <div>{productView && productView.subCategoryName}</div>
            </div>

        </div>

</div>
    )
}

export default Productview;
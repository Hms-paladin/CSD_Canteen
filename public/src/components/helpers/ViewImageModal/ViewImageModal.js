import React,{useEffect,useState} from "react";
import "./ViewImageModal.css"
import image from '../../images/panamaram.jpeg';
import {connect} from "react-redux";


const ViewImageModal = ({ productId,newarrival }) => {

    const [imageUrl,setImageUrl] = useState(null) 

    useEffect(() => {
        if(productId) {
            const imageData = newarrival && newarrival.length > 0 && newarrival.find(data => data.productId === productId)
            setImageUrl(imageData.productMedia)
        }
    },[])

    return(
        <div className="image-modal me">
        <img  className="modal_img" src={imageUrl !== null && imageUrl} alt="modalimg" />
    </div>
    )
}


const mapStateToProps = state => ({
    newarrival:state.newarrival.payload
})


export default connect(mapStateToProps)(ViewImageModal);
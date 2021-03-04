import React, { useState } from "react";
import apiurl from "../utils/baseUrl";
import axios from "axios";

const TermsCondition=({history})=>{

    const [pageDetails,setpageDetails] = useState("")
    const [count,setCount] = useState(1)

    count === 1 &&
    axios({
        method:"GET",
        url:apiurl+'getPageDetailsWeb',
    }).then((response)=>{
        response.data.data.map((value)=>{
            if(value.pageContentId === 4){
                setpageDetails(value.pageDetails)
                setCount(count+1)
            }
        })
    })

    return(
        count === 1 ?
        `${document.write(pageDetails && '<div style="padding:15px;margin: auto;margin-top: 5%;background-color: white;width: 60%;border: 1px solid grey;">'+pageDetails+'</div>')}`
        :null
    )
}


  export default TermsCondition 


  



  
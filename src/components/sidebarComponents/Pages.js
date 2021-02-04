import React, { Component,useEffect,useState,Fragment } from "react"
import "../tableHeader/TableHeader.css"
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Select } from "antd";
import {getPageDetails,editPageDetails} from "../../actions/pages";
import {useDispatch,connect} from "react-redux";
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';


const Pages = ({ pageDetails }) => {

    const { Option } = Select;
    const dispatch = useDispatch()

    const [pageIndex,setPageIndex] = useState(0)

    const [pageData,setPageData] = useState("")
    const [pageContentId,setPageContentId] = useState(null)

    useEffect(() => {

        // CKEDITOR.replace( 'textarea_id', {
        //     enterMode: CKEDITOR.ENTER_DIV
        // });

        dispatch(getPageDetails())

        if(pageDetails && pageDetails.length > 0) {
          
            setPageData(pageDetails[pageIndex].pageDetails)
            setPageContentId(pageDetails[pageIndex].pageContentId)
        }
    },[])




    const drpdwnValues = () => {
      
        let pageValues = [];
        for(let i=0;i < pageDetails.length;i++) {
             pageValues.push(<Option key={i+1}  value={pageDetails[i].pageContentId}>{pageDetails[i].pageName}</Option>)
        }

        return pageValues;
    }

    const handlePageDetails = (data) => {
        
        const pageIndex = pageDetails.findIndex(page => page.pageContentId === data)

        setPageData(pageDetails[pageIndex].pageDetails)
        setPageContentId(pageDetails[pageIndex].pageContentId)
        setPageIndex(pageIndex)
    }

    const handlePageData = (e,editor) => {
        const data = editor.getData();
        setPageData(data)
    }

    const updatePageDetails = () => {
       if(pageData.trim() !== "") {
           dispatch(editPageDetails(pageContentId,pageData))
       }else {
           alert("values required")
       }
    }

    const cancelDetails = () => {
        setPageData("")
    }

    return(
       <Fragment>
        <div className="pages">

        <div className="pages_header">Pages</div>

        <div className="pages_content">

        <div className="wrap_head">
        <div className="wrap_1">
              <div className="label_drop">Pages</div>
              <Select className="pages_dropdown" value={pageDetails && pageDetails.length > 0 ? pageDetails[pageIndex].pageName : ""} style={{width:"220px"}} onChange={(data) => handlePageDetails(data)} >
                 {pageDetails && pageDetails.length > 0 ? drpdwnValues() : []}
            </Select>              
        </div>
        </div>

        <CKEditor 
            className="description_text"
            data={pageDetails && pageDetails.length > 0 ? pageData : ""}
            onChange={(e,editor) => handlePageData(e,editor)}
            onInit={ editor => {
                editor.setData(pageData)
                  } }
            editor={ClassicEditor}
            config={{
                removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 
                                'ImageToolbar', 'ImageUpload', 'MediaEmbed', 
                                'Undo', 'Table', 'BlockQuote', 'Indent', 'Redo']
              }}
          />

              <div className="footer__buttons">
                  <button className="footer-btn footer__cancel" onClick={cancelDetails}>Cancel</button>
                  <button className="footer-btn footer__save" onClick={updatePageDetails}>Save</button>
              </div>

         
          </div>

            
        </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    pageDetails:state.pages.pageDetails
})

export default connect(mapStateToProps)(Pages);


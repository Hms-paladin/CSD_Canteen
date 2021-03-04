import React from "react";
import './CareerModals.css'



const CareerView = () => {
    return(
        <div className="careerview_head">

        <div className="career_title">
         <div className="career_role">Sales Officer, Area Sales Manager and Regional Head</div>  
         <div className="career_location">Chennai</div> 
        </div>

         <div className="career_jd">
            <div className="jd_title">Job Description</div>

            <ul className="description_jd">
                <li>
                &#9675; Serves customers by selling products and meeting customer needs.
                </li>
                <li>
                &#9675; Services existing accounts, obtains orders, and establishes new accounts by planning and organizing daily 
                        work schedule to call on existing or potential sales outlets and other trade factors.
                </li>
                <li>
                &#9675; Adjusts content of sales presentations by studying the type of sales outlet or trade factor.  
                </li>
                <li>
                
                </li>
            </ul>
        </div>

        <div className="resume_share">Kindly share your resume to <a href="email" className="email_style">example@gmail.com </a></div>
        </div>
    )
}

export default CareerView;
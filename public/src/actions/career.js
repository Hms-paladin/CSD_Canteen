import {CAREER_DETAILS} from "./constants";
import axios from "axios";
import apiurl from "../utils/baseUrl";
import dateformat from "dateformat";




export const getCareerDetails = () => async dispatch => {
    
    try{

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const url = `${apiurl}getCareerDetails`;
        let data = {
            "limit":100,
            "pageno":1
        }
        
        const res = await axios.post(url,data,config)

        console.log("sdafjsadhf",res.data.data[0])

        dispatch({type:CAREER_DETAILS,payload:res.data.data[0].details})

    }catch (err) {
        console.error(err)
    }
}


export const addCareer = (careerData) => async dispatch => {
     const {careerTitle,careerLocation,careerDate,careerDescription,careerEmailId} = careerData;
    try {
        
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const url = `${apiurl}addCareerDetails`;

        const cdate = dateformat(careerDate,"yyyy-mm-dd")

        const body = {
            careerTitle,
            careerLocation,
            careerEmailId,
            careerDescription,
            careerDate:cdate
        }

        await axios.post(url,body,config)

        dispatch(getCareerDetails())
        
    } catch (err) {
        console.error(err)
    }
}


export const editCareer = (careerData) => async dispatch => {
    const {careerTitle,careerLocation,careerDate,careerDescription,careerEmailId,adminUserId,careerId} = careerData;
   try {
       
       const config = {
           headers:{
               "Content-Type":"application/json"
           }
       }

       const url = `${apiurl}updateCareerDetails`;

       const cdate = dateformat(careerDate,"yyyy-mm-dd")

       const body = {
           careerTitle,
           careerLocation,
           careerEmailId,
           careerDescription,
           careerDate:cdate,
           adminUserId,
           careerId
       }

       await axios.put(url,body,config)

       dispatch(getCareerDetails())
       
   } catch (err) {
       console.error(err)
   }
}


export const deleteCareer = (careerId) => async dispatch => {
    try {
      
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const url = `${apiurl}deleteCareerDetails`;

        await axios.delete(url,{ data: { careerId },config})
        dispatch(getCareerDetails())

    } catch (err) {
        console.error(err)
    }
}
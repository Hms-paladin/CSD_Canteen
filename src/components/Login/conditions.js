import React from 'react';
import axios from 'axios'
import apiurl from '../../utils/baseUrl';

class Condition extends React.Component{

    state={
        conditionDetails:null
    }

    componentWillMount(){
        this.getConditions()
    }

    getConditions = () => {
        axios({
            method:"GET",
            url:apiurl+'getPageDetailsWeb',
        }).then((response)=>{
            this.setState({
               conditionDetails:response.data.data

            })
        })
    }
    render(){
        return(
            <div>Hi</div>
        )
    }
}

export default Condition;
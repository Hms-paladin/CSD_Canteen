import React from 'react'
import './DashBo.css'
import TableHeader from "../tableHeader/TableHeader";
import {Container,Row,Col} from 'reactstrap'
import { Card, CardContent, Typography } from '@material-ui/core';
import Chart from 'react-apexcharts'
const DashBo = () => {

    const options={
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        }
    return (
        <div  className="main-content">
         <Container fluid={true}>
         <TableHeader title="Dashboard" />
       
       <Row xl="3" style={{margin:"10px"}}>
       
           {/* ____________________ */} 
           <Col>    
             <Card className="box_one" style={{borderRadius:'25px',paddingTop:'10px',paddingLeft:'10px'}}>
      <CardContent>
        <Typography  variant="h5" component="h2">
        2500
        </Typography >
        <Typography  gutterBottom>
        Total orders
        </Typography>
      </CardContent>
    </Card>
    </Col>
    {/* ____________________ */} 
           <Col>  
           <Card className="box_two" style={{borderRadius:'25px',paddingTop:'10px',paddingLeft:'10px'}}>
    <CardContent>
        <Typography variant="h5" component="h2">
        85
        </Typography>
        <Typography   gutterBottom>
        Ready for Delivery
        </Typography>
      </CardContent>
    </Card>
    </Col>
    {/* ____________________ */} 
           <Col>  
            <Card className="box_three" style={{borderRadius:'25px',paddingTop:'10px',paddingLeft:'10px'}}>
    <CardContent>
        <Typography variant="h5" component="h2"  >
        3500
        </Typography>
        <Typography gutterBottom>
        Total Users
        </Typography>
      </CardContent>
    </Card>
    </Col>

       </Row>
    
       {/* ----------------------------------- */}
       <Row  style={{margin:"20px 10px",border:'1px solid #F6F6F6',boxShadow:'5px 5px 5px 5px #DEDEDE',backgroungColor:'#F6F6F6'}}>
           <p>Orders By Category</p>
           <Col> <Chart options={{}}  series={[44, 15]} type="donut" width="380" /></Col>
           <Col>
           <div  style={{margin:"20px 10px",border:'1px solid #F6F6F6',boxShadow:'3px 3px 3px 3px #DEDEDE'}}>
               <p>Yearly Graph</p>
               <Chart options={{}} series={[44,15]} width="580" />
               </div></Col>
       </Row>
         {/* ----------------------------------- */}
       <Row style={{margin:"10px"}}>
       <p>Grocery Detail View</p>
       <Col> <Chart options={{}}  series={[44, 15]} type="donut" width="380" /></Col>
           <Col></Col>
       </Row>
       </Container>      
             
      
    
        </div>
    )
}

export default DashBo

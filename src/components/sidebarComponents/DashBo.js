import React, { useEffect, useState } from 'react'
import './DashBo.css'
import TableHeader from "../tableHeader/TableHeader";
import { Container, Row, Col } from 'reactstrap'
import { Card, CardContent, Typography } from '@material-ui/core';
import Chart from 'react-apexcharts'
import { useDispatch, useSelector, connect } from "react-redux";
import { GetDashboardDetails } from "../../actions/dashboard";
const DashBo = (props) => {
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState([])
  const [category, setCategory] = useState([])
  const [percentage, setPercent] = useState([])
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    dispatch(GetDashboardDetails({ startDate: "0", endDate: "0" }))
  }, [])

  useEffect(() => {
    let cat = [], percent = [], userscount = [];
    let temp=props.getDashboardDetails
    console.log(temp,"oooooooo")
    setDashboard(temp)
    temp.map((i)=>{
      i.orderCount[0].order_details.map((x)=>{
        cat.push(x.product_category)
        percent.push(x.percentage)
      })
      userscount=[i.userCount[0].precenatge, 100 - i.userCount[0].precenatge]
    })
    setCategory(cat)
    setPercent(percent)
    setUsers(userscount)
  }, [props.getDashboardDetails])

  const getrangeDate = (data) => {
    dispatch(GetDashboardDetails({ startDate: data.startDate, endDate: data.endDate }))
  }

  return (
    <div className="main-content">
      <TableHeader title="Dashboard" showDatePicker={true} getrangeDate={(data) => { getrangeDate(data) }} />
      <Container fluid={true}>
        <Row style={{ margin: "60px 10px" }}>
          <Col>
            <Card className="box_one" style={{ borderRadius: '25px', paddingTop: '10px', paddingLeft: '10px' }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {dashboard.length > 0 && dashboard[0].orderCount[0].totalOrderCount}
                </Typography >
                <Typography gutterBottom>
                  Total orders
                </Typography>
              </CardContent>
            </Card>
          </Col>
          {/* <Col>
            <Card className="box_two" style={{ borderRadius: '25px', paddingTop: '10px', paddingLeft: '10px' }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  8500
                </Typography>
                <Typography gutterBottom>
                  Order Amount
                </Typography>
              </CardContent>
            </Card>
          </Col> */}
          <Col>
            <Card className="box_three" style={{ borderRadius: '15px', paddingTop: '10px', paddingLeft: '10px' }}>
              <CardContent>
                <Typography variant="h5" component="h2"  >
                  {dashboard.length > 0 && dashboard[0].userCount[0].uesercount}
                </Typography>
                <Typography gutterBottom>
                  Total Users
                </Typography>
              </CardContent>
            </Card>
          </Col>
        </Row>
        <Row style={{ margin: "20px 10px", border: '1px solid #F6F6F6', boxShadow: '5px 5px 5px 5px #DEDEDE', backgroungColor: '#F6F6F6' }}>
          <Col>
          <p style={{fontWeight:600}}>Orders By Category</p>
            <Chart
              height="90%"
              options={{
                labels: category
              }} series={percentage} type="donut" width="380" />
          </Col>
          <Col>
          <p style={{fontWeight:600}}>Orders By Users</p>
            <Chart
              height="80%"
              options={{
                labels: ["App Users", "Non-Users"]
              }} series={users} type="donut" width="380" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
const mapStateToProps = state => ({
  getDashboardDetails: state.dashboard.getDashboardDetails

})
export default connect(mapStateToProps)(DashBo);

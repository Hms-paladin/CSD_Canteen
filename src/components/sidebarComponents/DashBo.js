import React from 'react'
import './DashBo.css'
import TableHeader from "../tableHeader/TableHeader";
import { Container, Row, Col } from 'reactstrap'
import { Card, CardContent, Typography } from '@material-ui/core';
import Chart from 'react-apexcharts'
const DashBo = () => {

  const getrangeDate = (data) => {
    // dispatch(getOrdersList({startDate:data.startDate,endDate:data.endDate}))
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
                  2500
              </Typography >
                <Typography gutterBottom>
                  Total orders
                </Typography>
              </CardContent>
            </Card>
          </Col>
          <Col>
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
          </Col>
          <Col>
            <Card className="box_three" style={{ borderRadius: '25px', paddingTop: '10px', paddingLeft: '10px' }}>
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
        <Row style={{ margin: "20px 10px", border: '1px solid #F6F6F6', boxShadow: '5px 5px 5px 5px #DEDEDE', backgroungColor: '#F6F6F6' }}>
          <p>Orders By Category</p>
          <Col>
            <Chart
            height="100%"
            options={{
              labels: ["Toiletries", "Household", "General Items", "Watches & Stationery", "Liquor", "Food & Medicine", "Common"]
            }} series={[6, 8, 20, 4, 5, 15, 9]} type="donut" width="380" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DashBo

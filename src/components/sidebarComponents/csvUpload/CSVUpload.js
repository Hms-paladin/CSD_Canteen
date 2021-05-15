import React, { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";
import apiurl from "../../../utils/baseUrl";
import axios from "axios";
import { Button } from 'antd';
import { notification, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';


import "./csvStyles.css";
import { getDate } from "date-fns";


// const papaparseOptions = {
//   header: true,
//   dynamicTyping: true,
//   skipEmptyLines: true,
//   transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
// };

function Reader() {

  const [csvFileValue, setCsvFileValue] = useState([])
  const [showProgress, setShowProgress] = useState(false)
  const [lastModifiedDate, setLastModifiedDate] = useState(false)

  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

  const handleForce = (data, fileInfo) => {
    console.log(data, fileInfo, "fileInfo")
    setCsvFileValue(data)
  }

  useEffect(()=>{
    getDate()
  },[])

  const getDate=()=>{
    axios({
      method: 'get',
      url: apiurl + 'last_modified_date',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        console.log(response.data.last_modified_date,"response.data.last_modified_date")
        setLastModifiedDate(response.data.data.last_modified_date)
      })
  }

  const updateInventory = () => {
    setShowProgress(true)


    const updatedProductList = []

    csvFileValue.filter((fileList) => {
      if(fileList[0] && fileList[1] && fileList[2]){
      updatedProductList.push({
        "indexNumber": fileList[0],
        "productQuantity": fileList[1],
        "price": fileList[2]
      })
    }
    })

    axios({
      method: 'put',
      url: apiurl + 'updateInventoryDetailsWeb',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        "inventoryList": updatedProductList,
        'modified_date':moment(new Date()).format('yyyy-MM-DD h:mm:ss')
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.status == 1) {
          notification.success({
            message: 'Product Updated Successfully',
          });
          document.getElementById("react-csv-reader-input").value = null;
          setCsvFileValue([])
          setShowProgress(false)
          getDate()
        }
      })
      .catch(function (error) {
        notification.error({
          message: 'Something went wrong, Please try again later.',
        });
      });
  }

  const btnDisable = document.getElementById("react-csv-reader-input") && document.getElementById("react-csv-reader-input").value
  console.log(lastModifiedDate,"lastModifiedDate")

  return (<div className="container">
    {showProgress &&
      <Spin className="progressbar_align" indicator={antIcon} />}
      {`Last UpdatedDate : ${ lastModifiedDate && moment(lastModifiedDate).format('DD/MM/yyyy')}`}
    <CSVReader
      cssClass="react-csv-input"
      //   label="Select CSV with secret Death Star statistics"
      onFileLoaded={handleForce}
      // parserOptions={papaparseOptions}
      accept={'.csv, text/csv'}
    />
    <Button disabled={!btnDisable} type="primary" onClick={updateInventory}>
      Update
    </Button>
  </div>)
}

export default Reader;
import React, { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";
import apiurl from "../../../utils/baseUrl";
import axios from "axios";
import { Button } from 'antd';
import { notification, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';


import "./csvStyles.css";

function Reader({ page, label }) {

  const [csvFileValue, setCsvFileValue] = useState([])
  const [showProgress, setShowProgress] = useState(false)
  const [lastModifiedDate, setLastModifiedDate] = useState(false)
  const [btnDisable,setBtnDisable] = useState(true)

  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

  const handleForce = (data, fileInfo) => {
    console.log(data, fileInfo, "fileInfo")
    setCsvFileValue(data)
    setBtnDisable(false)
  }

  useEffect(() => {
    getDate()
  }, [page])

  const getDate = () => {
    if (page === 'inventoryUpload') {
      axios({
        method: 'get',
        url: apiurl + 'last_modified_date',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          setLastModifiedDate(response.data.data.last_modified_date)
        })
    }
  }

  const updateInventory = () => {
    setShowProgress(true)

    if (page === 'inventoryUpload') {

      const updatedProductList = []

      csvFileValue.filter((fileList) => {
        updatedProductList.push({
          "indexNumber": fileList[0],
          "productQuantity": fileList[1],
          "price": fileList[2]
        })
      })

      axios({
        method: 'put',
        url: apiurl + 'updateInventoryDetailsWeb',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "inventoryList": updatedProductList,
          'modified_date': moment(new Date()).format('yyyy-MM-DD h:mm:ss')
        },
      })
        .then(function (response) {
          console.log(response);
          if (response.data.status == 1) {
            notification.success({
              message: 'Product Updated Successfully',
            });
            setCsvFileValue([])
            setShowProgress(false)
            getDate()
          }else{
            notification.error({
              message: 'Product Updated Failed',
            });
            setShowProgress(false)
          }
          setBtnDisable(true)
          document.getElementById("react-csv-reader-input" + page).value = ""
        })
        .catch(function (error) {
          notification.error({
            message: 'Something went wrong, Please try again later.',
          });
        });
    } else if (page === "insertCard") {
      const cardList = []
      const adminId = JSON.parse(localStorage.getItem('user')).adminId

      csvFileValue.filter((fileList, index) => {
        if (fileList[1]) {
          cardList.push({
            "card_type_id": fileList[1],
            "canteen_id": fileList[2],
            "card_number": fileList[3],
            "user_name": fileList[4],
            "mobile_number": fileList[5],
            "aadhar_number": fileList[6],
            "primary_user_id": fileList[7],
            "active_flag": fileList[8],
            "created_by": adminId,
            "created_on": fileList[10],
            "modified_by": adminId,
            "modified_on": fileList[12],
            "ip_address": fileList[13],
            "mar_stat_c1": fileList[14],
            "no_of_dep_c1": fileList[15],
            "dob_d": fileList[16],
            "gender_c1": fileList[17],
            "reltn_wth_prmy_c1": fileList[18],
            "fath_hus_nm_v35": fileList[19],
            "pp_ordno_dt_v50": fileList[20]
          })
        }
      })

      console.log(JSON.stringify(cardList), "cardList")

      axios({
        method: 'post',
        url: apiurl + 'insertCardDetailsCSV',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "cardList": cardList,
          'modified_date': moment(new Date()).format('yyyy-MM-DD h:mm:ss')
        },
      })
        .then(function (response) {
          console.log(response);
          if (response.data.status == 1) {
            notification.success({
              message: 'Card Added Successfully',
            });
            setCsvFileValue([])
            setShowProgress(false)
            getDate()
          }else{
            notification.error({
              message: 'Card Added Failed',
            });
            setShowProgress(false)
          }
          setBtnDisable(true)
          document.getElementById("react-csv-reader-input" + page).value = ""
        })
        .catch(function (error) {
          notification.error({
            message: 'Something went wrong, Please try again later.',
          });
        });
    } else if (page === "insertProduct") {
      const addProduct = []
      const adminId = JSON.parse(localStorage.getItem('user')).adminId

      csvFileValue.filter((fileList, index) => {
        if (fileList[1]) {
          addProduct.push({
            "category_id": fileList[1],
            "sub_category_id": fileList[2],
            "index_number": fileList[3],
            "product": fileList[4],
            "product_description": fileList[5],
            "tax_id": fileList[6],
            "product_rate": fileList[7],
            "balance_quantity": fileList[8],
            "product_discount_percent": fileList[9],
            "product_discount_amount": fileList[10],
            "product_image_path": fileList[11],
            "active_flag": fileList[12],
            "created_by": adminId,
            "created_on": fileList[14],
            "modified_by": adminId,
            "modified_on": fileList[16]
          })
        }
      })

      console.log(JSON.stringify(addProduct), "addProduct")

      axios({
        method: 'post',
        url: apiurl + 'insertProductDetailsCSV',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "inventoryList": addProduct,
          'modified_date': moment(new Date()).format('yyyy-MM-DD h:mm:ss')
        },
      })
        .then(function (response) {
          console.log(response);
          if (response.data.status == 1) {
            notification.success({
              message: 'Product Added Successfully',
            });
            setCsvFileValue([])
            setShowProgress(false)
            getDate()
          }else{
            notification.error({
              message: 'Product Added Failed',
            });
            setShowProgress(false)
          }
          setBtnDisable(true)
          document.getElementById("react-csv-reader-input" + page).value = ""
        })
        .catch(function (error) {
          notification.error({
            message: 'Something went wrong, Please try again later.',
          });
        });
    }
  }


  return (<div className="container">
    {showProgress &&
      <Spin className="progressbar_align" indicator={antIcon} />}
    {lastModifiedDate && (`Last UpdatedDate : ${lastModifiedDate && moment(lastModifiedDate).format('DD/MM/yyyy')}`)}
    <CSVReader
      cssClass="react-csv-input"
      label={label}
      onFileLoaded={handleForce}
      inputId={"react-csv-reader-input" + page}
      accept={'.csv, text/csv'}
    />
    <Button disabled={btnDisable} type="primary" onClick={updateInventory}>
      Update
    </Button>
  </div>)
}

export default Reader;
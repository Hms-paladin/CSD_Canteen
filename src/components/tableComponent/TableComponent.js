import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Checkbox } from 'antd';
import ViewImageModal from "../helpers/ViewImageModal/ViewImageModal";


// standard icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { ReactSVG } from "react-svg";

import pdf  from "../images/pdf.svg"
//css
import "./TableComponent.css";

const axios = require('axios');




// function desc(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function stableSort(array, cmp) {
//   console.log("sort", array);
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = cmp(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }

// function getSorting(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => desc(a, b, orderBy)
//     : (a, b) => -desc(a, b, orderBy);
// }

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props) {

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  // const headRows = [
  //   { id: "sno", label: "S.No" },
  //   { id: "patient", label: "Customer" },
  //   { id: "gender", label: "Gender" },
  //   { id: "age", label: "Age" },
  //   { id: "time", label: "Time" },
  //   { id: "service", label: "Service" },
  //   { id: "action", label: "Action" }
  // ];
  console.log(props.heading, "heading")
  console.log(props.rowdata,"rowdata")

  return (

    <TableHead className={props.alignheading}>
      <TableRow>
        {props.heading.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === row.id}
              hideSortIcon={row.id==""?true:false}
              direction={order}
              onClick={row.id==""?false: createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel> */}
            <TableSortLabel
              active={orderBy === row.id}
              direction={orderBy === row.id ? order : 'asc'}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
              {/* {orderBy === row.id ? (
                <span>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

export default class Tablecomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "",
      open: false,
      orderBy: "media_title",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      viewmodal: false,
      rows: this.props.rowdata,
      viewdata: null,
      type: "",
      title: "",
      pdfurl:this.props.pdfURL
    };
  }


  handleRequestSort = (event, property) => {
    console.log(property,"orderProperty")
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState({ order: isDesc ? "asc" : "desc" });
    this.setState({ orderBy: property });
  };

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  closemodal = () => {
    this.setState({ view: false, DeleteView: false });
  };

  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected.push(this.state.selected, name);
    } else if (selectedIndex === 0) {
      // newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      // newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // newSelected = newSelected.concat(
      //   selected.slice(0, selectedIndex),
      //   selected.slice(selectedIndex + 1),
      // );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  handleChangeDense(event) {
    this.setState({ dense: event.target.checked });
  }

  

  UNSAFE_componentWillReceiveProps(newProps) {
    console.log(newProps, "componentWillReceivePropsrowdata")
    let tablebodydata = this.props.rowdata
    this.setState({
      rows: newProps.rowdata
    })
    console.log("current state", this.state.rows)
  }

  render() {
    const isSelected = name => this.state.selected.indexOf(name) !== -1;
    const { rows, rowsPerPage, page } = this.state;
    console.log(this.props.rowdata, "rowdata")

    return (
      // <Spin className="spinner_align" spinning={this.props.props_loading}>
      <div className={`VendorDetailsDiv ${this.props.tablemasterclass}`}>
        <Paper className="paper">
          <div className="tableWrapper">
            {
              this.props.modeprop &&
              <div className="modeOfPayment">
                <span className="modeOfPaymentText">Mode of Payment</span>
              </div>
            }
            <Table
              className="table"
              aria-labelledby="tableTitle"
              size={this.state.dense ? "small" : "medium"}
            >
              {/* {this.props.modeprop && 
              <div className="mode__style">
                <div className="mode__style--container">
                <div className="mode__style--line">Mode of Payment </div>
                </div> 
              </div>} */}
              <EnhancedTableHead
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderBy}
                // onSelectAllClick={this.handleSelectAllClick}
                heading={this.props.heading}
                onRequestSort={this.handleRequestSort}
                rowCount={this.state.rows && this.state.rows.length}
                alignheading={this.props.alignheading}
              />
              <TableBody>
                {
                  this.state.rows.length === 0 && <TableCell className={"noFoundIconCenter"} colSpan={12}><div>No Data Found</div></TableCell>
                }
                {stableSort(
                  this.state.rows,
                  getSorting(this.state.order, this.state.orderBy)
                )
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                  )
                  .map((row, index, item) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => this.handleClick(event, row.name)}
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        className={this.props.tableRowCss}
                      >
                        {!this.props.blockSno && (
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {this.state.rowsPerPage * this.state.page -
                              1 +
                              index +
                              2}
                          </TableCell>
                        )}
                        {[row].map((data, index) => {
                          console.log(row, "tyu");
                          var keys = Object.keys(data);
                          // console.log(keys.length,"tabledata")
                          var arrval = [];
                          for (var m = 0; m < keys.length - 1; m++) {
                            arrval.push(
                              <TableCell key={data.id + "" + m} align="">
                                {data[keys[m]]}
                              </TableCell>
                            );
                          }
                          return arrval;
                        })}

                        {this.props.actionclose === "close" ? null : (
                          <TableCell
                            style={{ position: "relative" }}
                            className={`${this.props.tableicon_align}`}
                          >
                            {this.props.VisibilityIcon === "close" ? null : (
                              <VisibilityIcon
                                className="tableeye_icon"
                                onClick={() =>
                                  this.props.modelopen("view", row.id)
                                }
                              />
                            )}

                            {row.id === this.props.clickedId &&
                              this.props.viewModal && (
                                <ViewImageModal
                                  className="image_mod"
                                  productId={
                                    this.props.clickedId && this.props.clickedId
                                  }
                                />
                              )}

                       
                             {this.props.pdfDownload === "close"  
                              ? null :this.props.instructionManual === "true"?
                               [row].map((data, k) => {
                               return <span key={k}><a  href={data.pdfURL} target='blank'  download>{<img src={pdf} alt="pdf" />}</a></span> 
                             
                             })
                             :null}
                            {this.props.EditIcon === "close" ? null : (
                              <EditIcon
                                className="tableedit_icon"
                                onClick={() =>
                                  this.props.modelopen("edit", row.id)
                                }
                              />
                            )}

                            {this.props.DeleteIcon === "close" ? null : (
                              <DeleteIcon
                                className="tabledelete_icon"
                                onClick={() =>
                                  this.props.deleteopen("delete", row.id)
                                }
                              />
                            )}
                          </TableCell>
                        )}
                        {this.props.checkbox === "close" ? null : (
                          <TableCell
                            className={`${this.props.tableicon_align}`}
                          >
                            {this.props.checkbox === "close" ? null : (
                              <Checkbox className="checkbox_row" />
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              native: true,
            }}
            component="div"
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActionsWrapped}
          />

        </Paper>

      </div>
      // </Spin>
    );
  }
}

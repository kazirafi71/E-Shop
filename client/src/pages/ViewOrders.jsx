import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Box,
  Card,
  Container,
  TableFooter,
  TablePagination,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import { useDispatch } from "react-redux";
import { fetchOder } from "../redux/viewOrder/orderAction";
import Styles from './Order.module.css'

const ViewOrders = () => {
    
  const dispatch = useDispatch();
  

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchOder());
  }, []);

  const userList = async () => {
    const user = await Axios.get('/payment/view-order',{
        headers: {
            "authorization":"Bearer "+localStorage.getItem("auth_token")
        }
    })
    setData(user.data.order);
    console.log(user.data.order);
  };

  useEffect(() => {
    userList();
  }, []);

  //   const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-9">
                        <h2 className={`${Styles.order} ${Styles.another} py-5`}>View Orders</h2>
                        
                  

                    <Container className="my-4 container-fluid">
        <TableContainer component={Paper}>
          <Table className="" aria-label="simple table">
            <TableHead>
              <TableRow className='bg-dark text-light'>
                <TableCell className='text-light'>Order Id</TableCell>
                <TableCell className='text-light'   align="right">Email</TableCell>
                <TableCell className='text-light'  align="right">Price</TableCell>
                <TableCell className='text-light' align="right">Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    7,
                    10,
                    25,
                    { label: "All", value: -1 },
                  ]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ViewOrders;
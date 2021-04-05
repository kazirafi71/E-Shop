import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, IconButton, TableFooter, TablePagination, Typography } from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Styles from './Order.module.css'


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    root: {
     
      paddingTop: "30px",
      
    },
  });


const Users = () => {
    const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("/auth/user",{
        headers:{
            "authorization":"Bearer "+localStorage.getItem('auth_token')
        }
    })
      .then((result) => {
        console.log(result.data.users);
        setData(result.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const  deleteUserInfo=(userId)=>{
    Axios.delete(`/auth/user/${userId}`,{
      headers:{
          "authorization":"Bearer "+localStorage.getItem('auth_token')
      }
  })
    .then((result) => {
      console.log(result.data)

      const newData=data.filter((value )=>{
        return value._id != userId
      })
      setData(newData)
      
    })
    .catch((err) => {
      console.log(err);
    })
    
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    return (
        <div>
             <div className="container-fluid">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-10">
            <Container>
              <Paper>
                <Typography className={`${Styles.order} ${Styles.another} py-5`} variant='h4' >
                  View Users

                </Typography>
                
              </Paper>
            </Container>
          <Container className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className='bg-dark '>
              <TableCell className='text-light'>Id</TableCell>
              <TableCell className='text-light' align="right">First Name</TableCell>
              <TableCell className='text-light' align="right">Last Name</TableCell>
              <TableCell className='text-light' align="right">Email</TableCell>
              <TableCell className='text-light' align="right">Username</TableCell>
              <TableCell className='text-light' align="right">Role</TableCell>
              <TableCell className='text-light' align="right">Edit</TableCell>
              <TableCell className='text-light' align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell  align="right">
                {row.firstName}
              </TableCell>
              <TableCell  align="right">
                {row.lastName}
              </TableCell>
              <TableCell  align="right">
                {row.email}
              </TableCell>
              <TableCell  align="right">
                {row.userName}
              </TableCell>
              <TableCell  align="right">
                {row.role}
              </TableCell>
              
              <TableCell  align="right">
                <div className="">
                
                <Link to={`/admin/update-user/${row._id }`} >
                  <IconButton color='primary'>
                    <EditIcon/>
                  </IconButton>
                
                </Link>
                </div>
              </TableCell>
              <TableCell  align="right">
              <IconButton color='secondary' onClick={()=>deleteUserInfo(row._id)}  >
                   <DeleteIcon/>
                </IconButton>
              </TableCell>
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
              rowsPerPageOptions={[5, 7,10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
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

export default Users;
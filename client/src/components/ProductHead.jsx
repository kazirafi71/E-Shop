import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState ,useEffect} from "react";
import MinimizeIcon from "@material-ui/icons/Minimize";
import AddIcon from "@material-ui/icons/Add";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./SingleProduct.css";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useParams } from "react-router";
import Axios from "axios";
import Spinner from "./Spinner";




const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: "100vw",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

const ProductHead = () => {
    const classes = useStyles();

    const {postId} = useParams();

    const [productInfo,setProductInfo]=useState()
  
  useEffect(() => {
    Axios.get(`/admin/product/get-product/${postId}`)
      .then((result) => {
        //console.log(result.data.result);
        setProductInfo(result.data.result)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);
    
  console.log(productInfo)

    
    
    
  return (

    
    
    <div>
      <div className="container-fluid card">
        <div className="row card-body p-5">
          <div className="col-md-6 text-center">
            {
              productInfo ?  <img
              className="img-fluid"
              src={productInfo.product_img}
              alt=""
              srcset=""
            /> : 
            <Spinner/>
            }
           
          </div>
          <div className="col-md-6">
            <div className="text-center">
              { productInfo ?
              <Typography>
              <h2 className="m-3">{productInfo.product_name}</h2></Typography>
              : 
              <Spinner/>
              }
                
              <p>
                Rating:
                <StarBorderIcon />
                <StarBorderIcon />
                <StarBorderIcon />
                <StarBorderIcon />
                <StarBorderIcon />
              </p>
              <hr />
              <Typography>
              { productInfo ?
               <h1 className="text-danger my-3 py-3">{productInfo.price} Taka</h1>
              : 
              <Spinner/>
              }
             
              </Typography>
             
              <span className="mr-3">Quantity: </span>
              <Button variant="contained">
                <MinimizeIcon />
              </Button>
              <span className="px-4">10</span>
              <Button variant="contained">
                <AddIcon />
              </Button>
              <br />
              <br />
              <Button className="m-2 mx-4" variant="contained" color="primary">
                Buy now
              </Button>
              <Button variant="contained" color="secondary">
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Container className="my-5  ">
        <Paper className="rounded p-4">
          <Typography
            className="text-center mb-3 p-4 bg-warning text-light"
            variant="h5"
          >
            Product details
          </Typography>
          <Divider />
          <Typography>Description:</Typography>
          { productInfo ?
          <Typography className="ml-5" variant="subtitle2">
          {productInfo.description}
          </Typography>
               
               : 
               <Spinner/>
               }
          

          <div className="container mt-2 ">
            <div className="row">
              <div className="col text-center">
                <Typography
                  variant="h6"
                  className="text-light bg-primary py-3 mt-4"
                >
                  Product Information
                </Typography>
               
                
                {
                  productInfo ?  <Typography className="py-1" variant="subtitle2">
                 Product Name: {productInfo.product_name}
                </Typography> : 
                <Spinner/>
                }
                {
                  productInfo ?  <Typography className="py-1" variant="subtitle2">
                  Product Availability: {productInfo.quantity}
                </Typography> : 
                <Spinner/>
                }
               
               
              </div>
            </div>
          </div>
        </Paper>
      </Container>

      <Container className='mb-5' >
        <Paper className="rounded p-4">
          <form>
          <TextField
          id="standard-full-width"
          label="Comment"
          style={{ margin: 8 }}
          placeholder="Add your comment"
         
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
          </form>


          <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
     
      
    </List>
        </Paper>
      </Container>
    </div>
  );
};

export default ProductHead;

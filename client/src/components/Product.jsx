import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SingleProduct.css";
import Axios from "axios";
import { Snackbar, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartAction, productAction } from "../redux";
import Spinner from './Spinner'



const Product = () => {
  const [data, setData] = useState([]);
  const [cartInfo, setCartInfo] = useState(false);

  const dispatch = useDispatch();

  const xyz=useSelector(c=>c.product.product)
  console.log(xyz)
  

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
dispatch(productAction())
// console.log(xyz)
setData(xyz)

  }, []);

  const cartHandler = (productId) => {
    setCartInfo(true)
    const quantity=1

    dispatch(addToCart(productId,quantity))

  };

  

  useEffect(()=>{
    
    dispatch(cartAction())
    
    setCartInfo(false)

  },[cartInfo])

  return (
    <div className="container ">
      <div className="row g-4">
        {
          xyz.length==0 && <div className='text-center'>No product Found</div> 
        }
        {xyz &&  xyz.map((val) => {
          //console.log(val._id);
          return (
            <div className="col-md-4">
              <div className="card w-100 " style={{ height: "600px" }}>
                <Link
                  to={"/product/" + val._id}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={val.product_img}
                    className="card-img-top  img-fluid "
                    style={{ objectFit: "fill", height: "400px" }}
                    alt="..."
                  />
                </Link>
                <div className="card-body">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/product/" + val._id}
                  >
                    <h5 className="card-title">{val.product_name}</h5>
                  </Link>

                  <Typography color="secondary" variant="h6">
                    {val.price} Taka
                  </Typography>
                </div>
                <div className=" card-footer">
                {
                    localStorage.getItem("auth_token") ? 
                    <button
                 
                    onClick={() => cartHandler(val._id)}
                    className="btn btn-primary "
                  >
                    Add To Cart
                  </button> : 
                    <button
                 
                    onClick={handleClick({ vertical: 'top', horizontal: 'center' })}
                    className="btn btn-primary "
                  >
                    Add To Cart
                  </button>

                    
                  }
                
                  <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Please login"
        key={vertical + horizontal}
      />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;

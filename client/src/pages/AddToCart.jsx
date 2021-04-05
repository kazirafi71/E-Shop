import {
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartAction } from "../redux/cart/cartAction";
import Styles from "./AddToCart.module.css";
import MinimizeIcon from "@material-ui/icons/Minimize";
import AddIcon from "@material-ui/icons/Add";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((c) => c.cart);

  const [viewCart, setViewCart] = useState();

  useEffect(() => {
    dispatch(cartAction());

    // setQuantity(cart.quantity)
  }, []);
  const cartHandler = () => {};

  const addQuantity = (productId) => {
    dispatch(addToCart(productId, 1));
    dispatch(cartAction());
  };
  const removeQuantity = (productId) => {
    dispatch(addToCart(productId, -1));
    dispatch(cartAction());
  };
  const y = [];
  const priceProduct = () => {
    let x = 0;

    for (let i = 0; i < cart.view_cart.length; i++) {
      x = cart.view_cart[i].quantity * cart.view_cart[i].product.price;
      y.push(x);
      x = 0;
      console.log(y);
    }

    //console.log(x)
  };

  let total = priceProduct();
  console.log(total);

  let sum = 0;

  const helloPrice = () => {
    for (let i = 0; i < y.length; i++) {
      sum = sum + y[i];
    }

    return sum;
  };
  const p = helloPrice();
  console.log(p);

  return (
    <div>
      <div className="container">
        <div className="row">
          {cart.view_cart && (
            <div className="col-md-8 mt-5">
              <Container>
                <Paper className="">
                  <div className="mb-4">
                    <Typography
                      className="py-4 m-auto text-center"
                      variant="h6"
                    >
                      My Cart({cart && cart.quantity})
                    </Typography>
                    <Divider />
                  </div>
                  {cart.view_cart.map((val) => {
                    //console.log(val);
                    return (
                      <Container className="">
                        <Paper className="mb-3 p-2 ">
                          <div className={Styles.view__cart}>
                            <img
                              className="img-fluid h-25 w-25 mr-5"
                              src={val.product.product_img}
                              alt=""
                            />
                            <div className="w-100">
                              <Typography color="secondary" variant="h6">
                                {val.product.product_name}
                              </Typography>
                              <Typography variant="h6">
                                Price: {val.product.price}Taka
                              </Typography>
                              <div className="d-flex align-content-center my-3">
                                <Typography
                                  className="mr-1"
                                  variant="subtitle1"
                                >
                                  Quantity:{" "}
                                </Typography>
                                {val.quantity <= 0 ? (
                                  <Button
                                    className="disabled"
                                    disabled
                                    variant="contained"
                                  >
                                    <MinimizeIcon />
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      removeQuantity(val.product._id)
                                    }
                                    variant="contained"
                                  >
                                    <MinimizeIcon />
                                  </Button>
                                )}

                                <Typography
                                  variant="subtitle1"
                                  className="mx-1"
                                >
                                  {val.quantity}
                                </Typography>
                                {val.product.quantity == val.quantity ? (
                                  <Button
                                    className="disabled"
                                    disabled
                                    variant="contained"
                                  >
                                    <MinimizeIcon />
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => addQuantity(val.product._id)}
                                    variant="contained"
                                  >
                                    <AddIcon />
                                  </Button>
                                )}
                              </div>

                              <div className="mb-2"></div>
                              <Button
                                className="m-1"
                                color="primary"
                                variant="contained"
                              >
                                SAVE FOR LETTER
                              </Button>
                              <Button
                                className="m-1"
                                color="secondary"
                                variant="contained"
                              >
                                REMOVE
                              </Button>
                            </div>
                          </div>
                        </Paper>
                        <Divider />
                      </Container>
                    );
                  })}
                  <div className={Styles.place_order}>
                    <Button
                      className={` ${Styles.button__style}`}
                      variant="contained"
                      color="primary"
                      
                    >
                      Place Order
                    </Button>
                  </div>
                </Paper>
              </Container>
            </div>
          )}
          <div className="col-md-4">
            <Container className="mt-5 ">
              <Paper className="p-2">
                <Typography variant="h6">PRICE DETAILS</Typography>
                <hr />

                <div className="d-flex justify-content-between">
                  <Typography variant="subtitle">
                    Price ({cart && cart.quantity} items)
                  </Typography>
                  <Typography variant="subtitle">{p}</Typography>
                </div>

                <div className="d-flex justify-content-between">
                  <Typography variant="subtitle">Discount</Typography>
                  <Typography variant="subtitle">0</Typography>
                </div>
                <div className="d-flex justify-content-between">
                  <Typography variant="subtitle">Delivery Charges</Typography>
                  <Typography variant="subtitle">Free</Typography>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Typography variant="h6">Total Price</Typography>
                  <Typography variant="h6">{p}</Typography>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

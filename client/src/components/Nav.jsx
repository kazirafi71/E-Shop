import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { IconButton, TextField, Typography } from "@material-ui/core";
import Styles from "./Navbar.module.css";
import Test from "./Test";

const Nav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const { quantity } = useSelector((c) => c.cart);

  return (
    <div className="pb-5">
      <div className={Styles.nav}>
        <div className={Styles.nav_style}>
          <div className="">
            <Typography variant='h5' className='mx-4'>
              <Link to="/" className="text-light text-decoration-none">
                E-Shop
              </Link>
            </Typography>
          </div>

          <div className="">
            <Test />
          </div>

          <div className="d-flex justify-content-evenly mx-3 align-items-center">

              {
                  state && state.isAuthenticated && 
                  <Link
              className="text-light text-decoration-none"
              to={
                state.user && state.user.role === "User"
                  ? "/user/dashboard"
                  : "/admin/dashboard"
              }
            >
              Dashboard
            </Link>

              }
           
            
            <Link
              to="/add-to-cart"
              style={{ color: "white", textDecoration: "none" }}
            >
              <div className="d-flex align-items-center">
                <ShoppingBasketIcon className="" color="" fontSize="large" />
                <p>{quantity}</p>
              </div>
            </Link>

            {
                state && state.isAuthenticated ?
                <Link
              onClick={() => {
                dispatch({ type: "CLEAR_USER" });
                localStorage.clear("jwt");
                localStorage.clear("user");
                return history.push("/login");
              }}
              className="nav-link btn btn-danger text-light "
              to="/login"
            >
              Logout
            </Link> : 
            <Link className="text-light text-decoration-none" to='/login'>
            Login
            </Link>

            }

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;

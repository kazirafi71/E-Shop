import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { IconButton, TextField } from "@material-ui/core";
import Styles from  './Navbar.module.css'
import Test from "./Test";



const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
 
  

  

  const state = useSelector((state) => state.auth);
  const {quantity} = useSelector((c) => c.cart);
  //console.log(quantity)
  //console.log(state);

  return (
    <div className="mb-5 pb-4">
      <nav className="navbar  fixed-top navbar-expand-sm navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            E-shop
          </Link>
         
               
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarNav">
          
            {state.isAuthenticated ? (
              <div className={Styles.nav_style}>
                <div className={Styles.search__style}>
              <Test/>
              </div>
               <div className="">
              <ul className="navbar-nav m-auto">
                <li class="nav-item dropdown">
                  <a
                    className="nav-link "
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <Avatar
                      className="avatar__style"
                      alt="Remy Sharp"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                    />
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/create-post">
                      Create-Post
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={
                        state.user && state.user.role === "User"
                          ? "/user/dashboard"
                          : "/admin/dashboard"
                      }
                    >
                      Dashboard
                    </Link>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
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
                    </Link>
                  </div>
                </li>
                
                <li className="nav-item">
            
                <Link to='/add-to-cart' style={{color:'white', textDecoration: "none"}} >
                <div className='d-flex align-items-center'>
                 
                <ShoppingBasketIcon className='' color='' fontSize='large' />
                <p>{quantity}</p>
                
                </div>
                </Link>
                
                </li>
                
              </ul>
              </div>
              
             
              </div>
            ) : (
              <ul className="navbar-nav ml-auto d-flex">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                
                <li className="nav-item">
                <Link to='/add-to-cart' style={{color:'white', textDecoration: "none"}} >
                <div className='d-flex align-items-center'>
                 
                <ShoppingBasketIcon className='' color='' fontSize='large' />
                <p>{quantity}</p>
                
                </div>
                </Link>
                
                </li>
              </ul>
            )}

           
          </div>
        </div>
        
      </nav>
    </div>
  );
};

export default withRouter(Navbar);

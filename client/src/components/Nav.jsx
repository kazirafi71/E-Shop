import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import './Navbar.css'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { IconButton } from "@material-ui/core";

const Nav = () => {
    const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.auth);
  //console.log(state);
    return (
        <div className=''>
        <div className='  menu'>
            <Link to='/' className='nav__logo'>
            <h3>
                Nav
            </h3>
            </Link>
            <div className='nav__items'>
                <IconButton >
                <ShoppingBasketIcon color='secondary' fontSize='large' />
                </IconButton>
               
            {state.isAuthenticated ? (
              <ul className="lisstt">
                <li class="hello dropdown">
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
                      className='avatar__style'
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
              </ul>
            ) : (
              <ul className="">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            )}
            </div>
        </div>
        </div>
    );
};

export default Nav;
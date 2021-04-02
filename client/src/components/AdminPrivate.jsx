import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const AdminPrivate = ({ children, ...rest }) => {
    const x = useSelector(x => x.auth.user)
    console.log(x.role==='Admin')
    let user= JSON.parse(localStorage.getItem('user'))
    console.log((user))
    
    return (
      <Route
      {...rest}
      render={({ location }) =>
        user && user.role==='Admin' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/notfound",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default AdminPrivate;
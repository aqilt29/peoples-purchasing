import React from 'react';
import { Route } from 'react-router-dom';
import useAuth from './Authenticated';
import Unauthorized from '../Pages/Unauthorized';

const PrivateRoute = ({ children, ...rest }) => {
    console.log('useAuth.isAuthenticated:', useAuth.isAuthenticated)
    return (
      <Route
        {...rest}
        render={() =>
          useAuth.isAuthenticated ? (
            <div>
                {children}
                <h3>private route</h3>
            </div>
          ) : (
            <Unauthorized message={'private route'}/>
          )
        }
      />
    )
}

export default PrivateRoute;

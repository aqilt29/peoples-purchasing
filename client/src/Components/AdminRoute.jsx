import React, { useEffect } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const AdminRoute = ({ component: Component, path, location = window.location, ...rest }) => {
  const { isAuthenticated, loginWithRedirect, dbUser } = useAuth0();

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: location.pathname }
        });
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, path, location]);

  const render = props => (
      (isAuthenticated === true && (dbUser.role === 'Admin')) ? <Component {...props} /> : <Redirect {...props} pathname="/dashboard"/>);

  return <Route path={path} render={render} {...rest} />;
};

export default withRouter(AdminRoute);

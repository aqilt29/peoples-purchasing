import React from 'react';
import useAuth from '../utils/Authenticated'
import { useLocation, useHistory } from 'react-router-dom';

const LoginPage = () => {

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
    useAuth.authenticate(() => {
        history.replace(from);
    })}

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={login}>Log in</button>
      </div>
    );
};

export default LoginPage;

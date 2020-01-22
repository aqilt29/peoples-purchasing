import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = ({ message }) => {
    return (
        <div>
            <h3>Unauthorized</h3>
            <p>{message}</p>
            <Link to="/login">Back to Login Screen</Link>
        </div>
    )
}

export default Unauthorized;
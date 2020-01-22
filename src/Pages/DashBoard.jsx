import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div>
            <h3>Dashboard</h3>
            <Link to="/purchaseform">Purchase From Link</Link>
        </div>
    )
}

export default Dashboard;

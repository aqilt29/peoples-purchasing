import React from 'react';
import { useUser } from '../user-context';

const Dashboard = () => {
    const { dbUser } = useUser()

    console.log(dbUser)

    return (
        <div>
            <h3>Dashboard</h3>
        </div>
    );
};
export default Dashboard;

import React, { useState } from 'react';
import { useUser } from '../user-context';
import { useAuth0 } from '../react-auth0-spa';

const Dashboard = () => {
  const { dbUser, setDbUser } = useUser();
  const [userName, setUserName] = useState(false);

  const handleSubmit = (e) => {
      e.preventDefault();
      setDbUser(userName);
  }

  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <h4>USER: {JSON.stringify(dbUser)}</h4>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </label>
          <button onClick={handleSubmit} >Change Name</button>
        </form>
      </div>
    </div>
  );
};
export default Dashboard;

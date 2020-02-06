import React, { useState } from 'react';

const Dashboard = () => {
  const [userName, setUserName] = useState(false);

  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <h4>USER: {JSON.stringify({'hello': 'this works'})}</h4>
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
          <button onClick={() => {}} >Change Name</button>
        </form>
      </div>
    </div>
  );
};
export default Dashboard;

import React, { useState, useEffect, useContext } from 'react';
import { getUserByEmail } from './api/userApi';

export const UserContext = React.createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {


  const [dbUser, setDbUser] = useState(null);
  console.log('user rendered')
  return (
    <UserContext.Provider
      value={{
        dbUser,
        setDbUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
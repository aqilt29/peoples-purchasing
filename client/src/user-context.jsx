import React, { useState, useEffect, useContext } from 'react';

export const UserContext = React.createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  const [dbUser, setDbUser] = useState(null);

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
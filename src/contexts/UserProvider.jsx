import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')));
  } , [])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

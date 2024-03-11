// MyContext.js
import React, { createContext, useState } from 'react';

// Create a context
export const MyContext = createContext();

// Create a context provider
export const MyContextProvider = ({ children }) => {
  const [value, setValue] = useState('Hello from Context!');

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

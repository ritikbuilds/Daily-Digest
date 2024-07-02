import React, { useState } from "react";
import { createContext, useContext } from "react";
const newsData = createContext();

function Provider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  return (
    <newsData.Provider value={{ data, setData, loading, setLoading,error,setError }}>
      {children}
    </newsData.Provider>
  );
}

export function useData() {
  return useContext(newsData);
}

export default Provider;

  
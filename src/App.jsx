import "./App.css";
import React, { createContext, useState } from "react";
import { RouterConfig } from "./config/RouterConfig";
export const newContext = createContext();

function App() {
  const [info, setInfo] = useState({});
  return (
    <newContext.Provider value={{ info, setInfo }}>
      <RouterConfig className="m-0 p-0" />
    </newContext.Provider>
  );
}
export default App;

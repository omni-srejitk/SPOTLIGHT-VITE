import "./App.css";
import React from "react";
import { RouterConfig } from "./config/RouterConfig";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "./context/storeContext";
function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <RouterConfig />
        </StoreProvider>
      </QueryClientProvider>
    </Router>
  );
}
export default App;

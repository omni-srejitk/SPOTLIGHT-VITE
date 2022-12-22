import "./App.css";
import React from "react";
import { RouterConfig } from "./config/RouterConfig";
import { QueryClient, QueryClientProvider } from "react-query";
import StoreContext from "./context/storeContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext>
        <RouterConfig />
      </StoreContext>
    </QueryClientProvider>
  );
}
export default App;

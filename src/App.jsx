import "./App.css";
import React from "react";
import { RouterConfig } from "./config/RouterConfig";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "./context/storeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Header />
          <RouterConfig />
          <Footer />
        </StoreProvider>
      </QueryClientProvider>
    </Router>
  );
}
export default App;

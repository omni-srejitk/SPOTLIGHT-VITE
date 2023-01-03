import "./App.css";
import React from "react";
import { RouterConfig } from "./config/RouterConfig";
import TagManager from "react-gtm-module";
function App() {
  if (import.meta.env.PROD == true) {
    const tagManagerArgs = {
      gtmId: import.meta.env.VITE_GTM_TOKEN,
    };

    TagManager.initialize(tagManagerArgs);
  }

  return (
    <div className="App bg-black">
      <RouterConfig />
    </div>
  );
}
export default App;

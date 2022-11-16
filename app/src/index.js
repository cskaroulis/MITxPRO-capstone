import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App/App";
import { AppContext, contextMgr } from "./common/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContext.Provider value={contextMgr}>
      <App />
    </AppContext.Provider>
  </React.StrictMode>
);

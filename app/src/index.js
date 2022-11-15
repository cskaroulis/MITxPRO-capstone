import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./index.css";
import { AppContext, contextMgr } from "./common/context";
import App from "./components/App/App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AppContext.Provider value={contextMgr}>
        <App />
      </AppContext.Provider>
    </HashRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Switch } from "wouter";
import App from "./App";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";

// 1. Library styles first
import 'delightplus-ui/styles.css'; 
// OR, if you want the deep path:
import 'delightplus-ui/dist/styles.css';
// 2. Your own Tailwind / globals next
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Switch>
      <Route path="/" component={App} />
      {/* <Route path="/signin" component={SignIn} /> */}
      {/* <Route path="/signup" component={SignUp} /> */}
    </Switch>
  </React.StrictMode>
);

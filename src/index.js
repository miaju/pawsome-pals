import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH_AUD,
      scope: "openid profile read:users read:current_user update:current_user_metadata"
    }}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <Auth0Provider
//     domain={process.env.REACT_APP_AUTH_DOMAIN}
//     clientId={process.env.REACT_APP_AUTH_CLIENT}
//     authorizationParams={{
//       redirect_uri: window.location.origin,
//       audience: process.env.REACT_APP_AUTH_AUD,
//       scope: "openid profile read:users read:current_user update:current_user_metadata"
//     }}
//   >
//     <App />
//   </Auth0Provider>,
//   document.getElementById("root")
// );

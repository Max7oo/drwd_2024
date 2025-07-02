import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivacyPage from "./pages/PrivacyPage.jsx";
// import ErrorPage from "./pages/ErrorPage.jsx";s
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "privacy",
      element: <PrivacyPage />,
    },
  ],
  { basename: "/drwd_2024" }
  // { basename: "/" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey="6LeSwCAcAAAAAFiJhDkF9i-3hlmHl_cUHDm4eB7N">
      <RouterProvider router={router} />
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);

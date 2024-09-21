import React from "react";
import ReactDOM from "react-dom/client";

import "./globals.css";
import "leaflet/dist/leaflet.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ClockInOut from "./pages/ClockInPage/clockin.js"; /*Automatically loads in page*/
import LoginSignup from "./pages/signin/LoginSignup/LoginSignup.jsx";
const ProviderMap = React.lazy(() =>
  import("./pages/ProviderMap/supervisor.js")
);
// const ClockInPage = React.lazy(() => import("./pages/ClockInPage/clockin.js"));
const Home = React.lazy(() => import("./pages/Home/home.js"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Layout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clock-in" element={<ClockInOut />} />
        <Route path="/ProviderMap" element={<ProviderMap />} />
        <Route
          path="/login"
          element={<Navigate to="http://localhost:5000/login" />}
        />
      </Routes>
    </BrowserRouter>
  </Layout>
);

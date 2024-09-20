import React from "react";
import ReactDOM from "react-dom/client";

import "./globals.css";
import "leaflet/dist/leaflet.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const ProviderMap = React.lazy(() => import("./pages/ProviderMap"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Layout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProviderMap />} />
      </Routes>
    </BrowserRouter>
  </Layout>
);

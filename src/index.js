import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom/client";

import "./globals.css";
import "leaflet/dist/leaflet.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ClockInOut from "./pages/ClockInPage/clockin.js"; /*Automatically loads in page*/
import Supervisor from "./pages/ProviderMap/supervisor.js"; /*Automatically loads in page*/
import HomePage from "./pages/Home/home.js";
import { ProtectedRoute } from "./components/ProtectedRoute/protectedroute.js";

//const ProviderMap = React.lazy(() => import("./pages/ProviderMap/supervisor.js"));
// const ClockInPage = React.lazy(() => import("./pages/ClockInPage/clockin.js"));
// comment out all react lazy

export const AuthContext = createContext({});

const AuthContainer = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    is_authenticated: true,
  });

  useEffect(() => {
    fetch("/isAuthenticated", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.is_authenticated !== null) {
          setAuthenticatedUser(data);
          console.log(data);
        }
      })
      .catch((error) => console.error("ERROR:", error));
  }, []);

  const isAuthenticated = authenticatedUser.is_authenticated;

  return (
    <AuthContext.Provider value={authenticatedUser}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<HomePage />}
                />
              }
            />
            <Route
              path="/clock-in"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<ClockInOut />}
                />
              }
            />
            <Route
              path="/ProviderMap"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={<Supervisor />}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </AuthContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AuthContainer />);

import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import HomePage from "../../pages/Home/home";

const ExternalNavigate = ({ to }) => {
  useEffect(() => {
    window.location.href = to;
  });

  return null;
};

const ProtectedRoute = ({ element, isAuthenticated }) => {
  if (isAuthenticated === null) {
    console.log("UMM");
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    element
  ) : (
    <ExternalNavigate to="http://localhost:5000/login" />
  );
};

export { ProtectedRoute, ExternalNavigate };

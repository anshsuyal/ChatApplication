import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

import useGetCurrentUser from "./customHooks/getCurrentUser";
import useGetOtherUsers from "./customHooks/getOtherUser";

const App = () => {
  // Always try to restore logged-in user
  useGetCurrentUser();

  const { userData } = useSelector((state) => state.user);

  // Safe: hook internally checks for userData
  useGetOtherUsers();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />

      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />

      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;

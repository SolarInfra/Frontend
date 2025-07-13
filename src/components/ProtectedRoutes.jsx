import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PreventBackNavigation from './PreventBackNavigation';

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PreventBackNavigation />
      <Outlet/>
    </>
  );
};

export default ProtectedRoutes

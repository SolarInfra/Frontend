import React, { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

const AdminGate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const location = useLocation();

  const correctPassword = '@solarinfraadmin123'; // your password here

  const handleLogin = () => {
    if (inputPassword === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  // If not logged in and trying to access any /admin subroute, redirect to /admin
  if (!isAuthenticated && location.pathname !== '/admin') {
    return <Navigate to="/admin" replace />;
  }

  // If not authenticated and on /admin route, show password prompt
  if (!isAuthenticated && location.pathname === '/admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-xl mb-4">Enter Admin Password</h2>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleLogin}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    );
  }

  // Authenticated — show nested routes
  return <Outlet />;
};

export default AdminGate;

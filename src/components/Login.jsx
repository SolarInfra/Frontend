import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Login = () => {
  // const [identifier, setIdentifier] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [forgotIdentifier, setForgotIdentifier] = useState('');
  // const [forgotMessage, setForgotMessage] = useState('');
  // const [forgotError, setForgotError] = useState('');
  // const [forgotLoading, setForgotLoading] = useState(false);
  // const [showForgot, setShowForgot] = useState(false);


  // const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   try {
  //     const res = await fetch(`http://localhost:5000/api/auth/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ identifier, password })
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setError(data.error || 'Invalid credentials');
  //     } else {
  //       localStorage.setItem('authToken', data.token);
  //       navigate('/home');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError('Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleForgotPassword = async (e) => {
  //   e.preventDefault();
  //   setForgotMessage('');
  //   setForgotError('');
  //   setForgotLoading(true);

  //   try {
  //     const res = await fetch(`http://localhost:5000/api/auth/send-otp`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ phone: forgotIdentifier }) // Or email if you prefer
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setForgotError(data.error || 'Failed to send OTP');
  //     } else {
  //       setForgotMessage('OTP sent! Please check your phone.');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setForgotError('Something went wrong');
  //   } finally {
  //     setForgotLoading(false);
  //   }
  // };

  // return (
  //   // <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
  //   //   <form
  //   //     onSubmit={handleLogin}
  //   //     className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
  //   //   >
  //   //     <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

  //   //     <div className="mb-4">
  //   //       <label className="block text-gray-700 mb-1">Email or Phone</label>
  //   //       <input
  //   //         type="text"
  //   //         name="identifier"
  //   //         value={identifier}
  //   //         onChange={(e) => setIdentifier(e.target.value)}
  //   //         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
  //   //         required
  //   //       />
  //   //     </div>

  //   //     <div className="mb-4">
  //   //       <label className="block text-gray-700 mb-1">Password</label>
  //   //       <input
  //   //         type="password"
  //   //         name="password"
  //   //         value={password}
  //   //         onChange={(e) => setPassword(e.target.value)}
  //   //         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
  //   //         required
  //   //       />
  //   //     </div>

  //   //     {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

  //   //     <button
  //   //       type="submit"
  //   //       disabled={loading}
  //   //       className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
  //   //     >
  //   //       {loading ? 'Logging in...' : 'Login'}
  //   //     </button>

  //   //     <div className="mt-4 text-center">
  //   //       <p className="text-sm text-gray-600">
  //   //         Don't have an account?{' '}
  //   //         <NavLink to={"/"} className="text-blue-600 hover:underline font-medium">
  //   //           Signup
  //   //         </NavLink>
  //   //       </p>
  //   //     </div>

  //   //     <div className="mt-6 text-center">
  //   //       <p className="text-sm text-blue-700 cursor-pointer hover:underline" onClick={() => setShowForgot(true)}>
  //   //         Forgot Password?
  //   //       </p>
  //   //     </div>

  //   //     {showForgot && (
  //   //       <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
  //   //         <h3 className="text-lg font-bold mb-4">Reset Password</h3>
  //   //         <form onSubmit={handleForgotPassword}>
  //   //           <input
  //   //             type="text"
  //   //             placeholder="Enter Phone Number"
  //   //             value={forgotIdentifier}
  //   //             onChange={(e) => setForgotIdentifier(e.target.value)}
  //   //             className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
  //   //             required
  //   //           />
  //   //           {forgotMessage && <p className="text-green-600 text-sm mb-2">{forgotMessage}</p>}
  //   //           {forgotError && <p className="text-red-600 text-sm mb-2">{forgotError}</p>}
  //   //           <button
  //   //             type="submit"
  //   //             disabled={forgotLoading}
  //   //             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
  //   //           >
  //   //             {forgotLoading ? 'Sending OTP...' : 'Send OTP'}
  //   //           </button>
  //   //         </form>
  //   //       </div>
  //   //     )}
  //   //   </form>

  //   // </div>

  //   <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
  //   <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
  //     <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

  //     <form onSubmit={handleLogin}>
  //       <div className="mb-4">
  //         <label className="block text-gray-700 mb-1">Email or Phone</label>
  //         <input
  //           type="text"
  //           name="identifier"
  //           value={identifier}
  //           onChange={(e) => setIdentifier(e.target.value)}
  //           className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
  //           required
  //         />
  //       </div>

  //       <div className="mb-4">
  //         <label className="block text-gray-700 mb-1">Password</label>
  //         <input
  //           type="password"
  //           name="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
  //           required
  //         />
  //       </div>

  //       {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

  //       <button
  //         type="submit"
  //         disabled={loading}
  //         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
  //       >
  //         {loading ? 'Logging in...' : 'Login'}
  //       </button>

  //       <div className="mt-4 text-center">
  //         <p className="text-sm text-gray-600">
  //           Don't have an account?{' '}
  //           <NavLink to={"/"} className="text-blue-600 hover:underline font-medium">
  //             Signup
  //           </NavLink>
  //         </p>
  //       </div>

  //       <div className="mt-6 text-center">
  //         <p
  //           className="text-sm text-blue-700 cursor-pointer hover:underline"
  //           onClick={() => setShowForgot(!showForgot)}
  //         >
  //           Forgot Password?
  //         </p>
  //       </div>
  //     </form>

  //     {showForgot && (
  //       <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
  //         <h3 className="text-lg font-bold mb-4">Reset Password</h3>
  //         <form onSubmit={handleForgotPassword}>
  //           <input
  //             type="text"
  //             placeholder="Enter Phone Number"
  //             value={forgotIdentifier}
  //             onChange={(e) => setForgotIdentifier(e.target.value)}
  //             className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
  //             required
  //           />
  //           {forgotMessage && <p className="text-green-600 text-sm mb-2">{forgotMessage}</p>}
  //           {forgotError && <p className="text-red-600 text-sm mb-2">{forgotError}</p>}
  //           <button
  //             type="submit"
  //             disabled={forgotLoading}
  //             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
  //           >
  //             {forgotLoading ? 'Sending OTP...' : 'Send OTP'}
  //           </button>
  //         </form>
  //       </div>
  //     )}
  //   </div>
  // </div>
  // );

   const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
      } else {
        localStorage.setItem('authToken', data.token);
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage('');
    setForgotError('');
    setForgotLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: forgotIdentifier }),
      });

      const data = await res.json();

      if (!res.ok) {
        setForgotError(data.error || 'Failed to send OTP');
      } else {
        setForgotMessage('OTP sent! Please check your phone.');
      }
    } catch (err) {
      console.error(err);
      setForgotError('Something went wrong');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleVerifyAndReset = async (e) => {
    e.preventDefault();
    setForgotMessage('');
    setForgotError('');
    setResetLoading(true);

    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match');
      setResetLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: forgotIdentifier,
          otp,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setForgotError(data.error || 'Could not reset password');
      } else {
        setForgotMessage('Password reset successfully! You can now log in.');
        // Optionally, close the forgot section:
        // setShowForgot(false);
      }
    } catch (err) {
      console.error(err);
      setForgotError('Something went wrong');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email or Phone</label>
            <input
              type="text"
              name="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <NavLink to="/" className="text-blue-600 hover:underline font-medium">
                Signup
              </NavLink>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p
              className="text-sm text-blue-700 cursor-pointer hover:underline"
              onClick={() => setShowForgot(!showForgot)}
            >
              Forgot Password?
            </p>
          </div>
        </form>

        {showForgot && (
          <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Reset Password</h3>

            <form onSubmit={handleForgotPassword}>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={forgotIdentifier}
                onChange={(e) => setForgotIdentifier(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
                required
              />
              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-3"
              >
                {forgotLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>

            {/* OTP & Reset Form */}
            <form onSubmit={handleVerifyAndReset}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
                required
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
                required
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
                required
              />

              {forgotMessage && <p className="text-green-600 text-sm mb-2">{forgotMessage}</p>}
              {forgotError && <p className="text-red-600 text-sm mb-2">{forgotError}</p>}

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                {resetLoading ? 'Resetting...' : 'Verify & Reset Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

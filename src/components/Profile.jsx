import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Profile = () => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ispassOpen, setIspassOpen] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('authToken');
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        console.warn("No auth token found. Redirecting or skipping fetch.");
        return;
      }
  
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authtoken": token,
          },
        });
  
        const data = await res.json();
  
        if (res.ok) {
          setUser(data);
          console.log(data)
        } else {
          console.error("Fetch failed:", data);
          // Optionally: localStorage.removeItem("authToken");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
  
    fetchUser();
  }, []);

   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (form.newPassword !== form.confirmPassword) {
      return setError("New password and confirm password do not match.");
    }

    try {
      const token = localStorage.getItem('authToken');

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/auth/reset-password`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'authtoken': `${token}`,
          }
        }
      );

      setMessage(res.data.message);
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone })
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Failed to resend OTP');
    }
  };

  const handleSendForgotOtp = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/send-otp`, {
        phone: form.phone,
      });
      setOtpSent(true);
      setMessage('OTP sent!');
    } catch (err) {
      setError('Failed to send OTP');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (form.newPassword !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/verify-reset-otp`, {
        phone: form.phone,
        otp: form.otp,
        newPassword: form.newPassword
      });

      setMessage(res.data.message || 'Password reset successfully');
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '', phone: '', otp: '' });
      setForgotMode(false);
      setOtpSent(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    }
  };

  return (
    <div className=' h-full w-full'>
      <div className='bg-gradient-to-r from-blue-400 to-indigo-600 min-h-[100vh] py-[40px] pb-[100px] flex flex-col items-center relative font-poppins'>

        <div className=' bg-slate-100 xl1:w-[60%] md5:w-[75%] w-[90%] border-[2px] border-slate-700 rounded-xl p-[26px] py-[30px] px-[16px] sm7:px-[26px] pb-[10px] flex flex-col items-center'>

          <div className='prof flex justify-between items-center w-full md8:px-[40px] px-[10px] mb-[20px]'>

            <div className='flex items-center gap-[10px]'>

              <div className='md7:w-[70px] md7:h-[70px] sm5:w-[50px] sm5:h-[50px] sm6:w-[40px] w-[30px] sm6:h-[40px] h-[30px] rounded-full p-[0px] bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-400'>
                <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
              </div>

              <div className='flex flex-col gap-[6px]'>
                <div><h1 className='md7:text-[16px] sm5:text-[14px] sm6:text-[12px] text-[9px] font-bold my-0 underline'>{user?.name}</h1></div>
                <div><h1 className='md7:text-[16px] sm5:text-[14px] sm6:text-[12px] text-[9px] font-bold my-0 underline'>{user?.phone}</h1></div>
              </div>

            </div>

            <div className='flex flex-col items-center gap-[2px]'>
              <div><h1 className='md7:text-[16px] sm5:text-[14px] sm6:text-[12px] text-[8px] font-bold m-0 '>₹{user?.currentBalance}</h1></div>
              <div><h1 className='md7:text-[12px] sm5:text-[10px] sm6:text-[8px] text-[8px] font-bold m-0 '>Income</h1></div>
            </div>

            <div className='flex flex-col items-center gap-[2px]'>
              <div><h1 className='md7:text-[16px] sm5:text-[14px] sm6:text-[12px] text-[8px] font-bold m-0 '>₹{user?.currentBalance}</h1></div>
              <div><h1 className='md7:text-[12px] sm5:text-[10px] sm6:text-[8px] text-[8px] font-bold m-0 '>Withdrawal</h1></div>
            </div>

            <div className='flex flex-col items-center gap-[2px]'>
              <div><h1 className='md7:text-[16px] sm5:text-[14px] sm6:text-[12px] text-[8px] font-bold m-0 '>₹{user?.rechargeBalance}</h1></div>
              <div><h1 className='md7:text-[12px] sm5:text-[10px] sm6:text-[8px] text-[8px] font-bold m-0 '>Recharge</h1></div>
            </div>

          </div>

          <div className='h-[2px] w-full bg-slate-400 mb-[30px]'></div>

          <div className='trnsc flex gap-[20px] justify-center'>
            <NavLink to={'/recharge'}>
            <div className='sm6:py-[18px] py-[14px] lg2:px-[156px] md8:px-[120px] sm5:px-[80px] sm6:px-[60px] px-[40px] h-[30px] flex justify-center items-center rounded-full bg-blue-400 text-white'><h1 className='sm5:text-[15px] sm6:text-[13px] text-[11px] font-semibold leading-none m-0'>Recharge</h1></div>
            </NavLink>
            <NavLink to={'/Withdrawc'}>
            <div className='sm6:py-[18px] py-[14px] lg2:px-[156px] md8:px-[120px] sm5:px-[80px] sm6:px-[60px] px-[40px] h-[30px] flex justify-center items-center rounded-full bg-blue-400 text-white'><h1 className='sm5:text-[15px] sm6:text-[13px] text-[11px] font-semibold leading-none m-0'>Withdraw</h1></div>
            </NavLink>
          </div>

          <div  onClick={() => setIsOpen(true)} className='mt-[30px]'><h1 className='sm5:text-[14px] text-[11px] font-normal cursor-arrow'>View more details?</h1></div>

        </div>

        <div className='opt bg-slate-100 xl1:w-[60%] md5:w-[75%] w-[90%] border-[2px] border-slate-700 rounded-xl p-[26px] py-[30px] mt-[8px] my-[26px]'>

          <NavLink className='no-underline' to={'/portfolio'}>
            <div className='flex items-center gap-[12px] mb-[10px] hover:bg-slate-300 py-[10px] md2:px-[20px] px-[8px] transition duration-300'>

            <div className=''>
              <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6b6565" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
              </svg>
            </div>

            <div><h1 className='md2:text-[16px] sm6:text-[14px] text-[10px] font-semibold text-black m-0'>Your orders</h1></div>

          </div>
          </NavLink>

          <NavLink className='no-underline' >
            <div  onClick={() => setIspassOpen(true)} className='flex items-center gap-[12px] mb-[10px] hover:bg-slate-300 py-[10px] md2:px-[20px] px-[8px] transition duration-300'>

            <div className=''>
              <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6b6565" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
              </svg>
            </div>

            <div><h1 className='md2:text-[16px] sm6:text-[14px] text-[10px] font-semibold text-black m-0'>Change password</h1></div>

          </div>
          </NavLink>

          <NavLink className='no-underline' to={'/aboutus'}>
            <div className='flex items-center gap-[12px] mb-[10px] hover:bg-slate-300 py-[10px] md2:px-[20px] px-[8px] transition duration-300'>
            <div className=''>
              <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6b6565" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V9a5 5 0 1 1 10 0v7.083A2.919 2.919 0 0 1 14.083 19H14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 1.732-1h.351a4.917 4.917 0 0 0 4.83-4H19a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.45 3.275a4 4 0 0 0-4.352.976 1 1 0 0 0 1.452 1.376 2.001 2.001 0 0 1 2.836-.067 1 1 0 1 0 1.386-1.442 4 4 0 0 0-1.321-.843Z" clip-rule="evenodd"/>
              </svg>
            </div>

            <div><h1 className='md2:text-[16px] sm6:text-[14px] text-[10px] font-semibold text-black m-0'>Help center</h1></div>

          </div>
          </NavLink>

          <NavLink className='no-underline' to={'/myrchrg'}>
            <div className='flex items-center gap-[12px] mb-[10px] hover:bg-slate-300 py-[10px] md2:px-[20px] px-[8px] transition duration-300'>
            <div className=''>
              <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6b6565" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M20 7h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C10.4 2.842 8.949 2 7.5 2A3.5 3.5 0 0 0 4 5.5c.003.52.123 1.033.351 1.5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2Zm-9.942 0H7.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z" clip-rule="evenodd"/>
              </svg>
            </div>

            <div><h1 className='md2:text-[16px] sm6:text-[14px] text-[10px] font-semibold text-black m-0'>My Recharges</h1></div>

          </div>
          </NavLink>

          <NavLink className='no-underline' to={'/myrdm'}>
            <div className='flex items-center gap-[12px] mb-[10px] hover:bg-slate-300 py-[10px] md2:px-[20px] px-[8px] transition duration-300'>
            <div className=''>
              <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6b6565" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M20 7h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C10.4 2.842 8.949 2 7.5 2A3.5 3.5 0 0 0 4 5.5c.003.52.123 1.033.351 1.5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2Zm-9.942 0H7.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z" clip-rule="evenodd"/>
              </svg>
            </div>

            <div><h1 className='md2:text-[16px] sm6:text-[14px] text-[10px] font-semibold text-black m-0'>My Redeems</h1></div>

          </div>
          </NavLink>

          <NavLink className='no-underline' to={'/mywithdraw'}>
            <div className='flex items-center gap-[12px] mb-[10px] hover:bg-slate-300 py-[10px] md2:px-[20px] px-[8px] transition duration-300'>
            <div className=''>
              <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6b6565" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M20 7h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C10.4 2.842 8.949 2 7.5 2A3.5 3.5 0 0 0 4 5.5c.003.52.123 1.033.351 1.5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2Zm-9.942 0H7.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z" clip-rule="evenodd"/>
              </svg>
            </div>

            <div><h1 className='md2:text-[16px] sm6:text-[14px] text-[10px] font-semibold text-black m-0'>My Wihtdrawals</h1></div>

          </div>
          </NavLink>

          <div className='no-underline'>
             <div className='flex items-center gap-[12px] hover:bg-slate-300 py-[10px] md2:px-[20px] px-[8px] transition duration-300' onClick={handleSignout}>

            <div className=''>
              <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6b6565" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
              </svg>
            </div>

            <div><h1 className='md2:text-[16px] sm6:text-[14px] text-[10px] font-semibold text-black m-0'>Sign Out</h1></div>

          </div>
          </div>

        </div>

        {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl relative bottom-[9%] border-[3px] border-blue-400">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 cursor-pointer">User Details</h2>

            <div className="text-gray-700">
              <p><span className=" font-semibold mb-[4px]">Name:</span> {user?.name}</p>
              <p><span className=" font-semibold mb-[4px]">Surname:</span> {user?.surname}</p>
              <p><span className=" font-semibold mb-[4px]">Number:</span> {user?.phone}</p>
              <p><span className=" font-semibold mb-[4px]">Email:</span> {user?.email}</p>
              <p><span className=" font-semibold mb-[4px]">Phonepe or Google pay No:</span> {user?.phonepeNo}</p>
              <p><span className=" font-semibold mb-[4px]">Address:</span> {user?.address}</p>
            </div>
          </div>
        </div>
        )}

        {/* {ispassOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl bottom-[11%] relative border-[3px] border-blue-400">

              <button onClick={() => setIspassOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
                ✕
              </button>

              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                  Reset Password
                </h2>

                <div className="mb-4">
                  <label className="block mb-1 text-gray-600">Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-gray-600">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-gray-600">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                    required
                  />
                </div>

                {message && <p className="text-green-600 mb-2">{message}</p>}
                {error && <p className="text-red-600 mb-2">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Update Password
                </button>
              </form>

            </div>
          </div>
        )} */}

        {ispassOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl bottom-[11%] relative border-[3px] border-blue-400">

      <button onClick={() => setIspassOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Reset Password
      </h2>

      {!forgotMode ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
              required
            />
          </div>

          {message && <p className="text-green-600 mb-2">{message}</p>}
          {error && <p className="text-red-600 mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Update Password
          </button>

          <p
            className="text-sm text-blue-500 mt-4 cursor-pointer"
            onClick={() => setForgotMode(true)}
          >
            Forgot Password?
          </p>
        </form>
      ) : (
        <form onSubmit={handleForgotSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
              required
            />
          </div>

          {!otpSent && (
            <button
              type="button"
              onClick={handleSendForgotOtp}
              className="w-full bg-blue-500 text-white py-2 rounded mb-4"
            >
              Send OTP
            </button>
          )}

          {otpSent && (
            <>
              <div className="mb-4">
                <label className="block mb-1 text-gray-600">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                  required
                />
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Resend OTP
                </button>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-600">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-600">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Reset Password
              </button>

            </>
          )}

          {message && <p className="text-green-600 mb-2">{message}</p>}
          {error && <p className="text-red-600 mb-2">{error}</p>}
        </form>
      )}

    </div>
  </div>
)}

      </div>
      <Navbar/>
    </div>
  )
}

export default Profile

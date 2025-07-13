import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     surname: '',
//     phone: '',
//     email: '',
//     address: '',
//     password: '',
//     referralCode: '',
//     accNo: ''
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         console.log('🚨 Signup response:', data);
//         if (!res.ok) setError(data.error || JSON.stringify(data));
//       } else {
//         const { token } = data
//         localStorage.removeItem('authToken');
//         localStorage.setItem('authToken', token);
//         navigate('/home');
//       }
//     } catch (err) {
//       setError('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg lg3:w-[40%] md6:w-[60%] sm9:w-[80%] w-full">
//         <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

//       <form
//         onSubmit={handleSubmit}
//         className='grid grid-cols-2 gap-[20px]'
//         id='signUpForm'
//       >
//         {['name', 'surname', 'phone', 'email', 'address', 'password', 'accNo', 'referral'].map((field) => (
//           <div className="mb-4" key={field}>
//             <label className="block text-gray-700 mb-1 capitalize">
//               {field === 'referral' ? 'Referral Code (optional)' : field === 'accNo' ? 'Account No.' : field}
//             </label>
//             <input
//               type={field === 'password' ? 'password' : 'text'}
//               name={field === 'referral' ? 'referralCode' : field}
//               value={formData[field]}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//               required={field !== 'referral'}
//             />
//           </div>
//         ))}

//         {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
 
//       </form>
//       <button
//           type="submit"
//           form='signUpForm'
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//           disabled={loading}
//         >
//           {loading ? 'Registering...' : 'Sign Up'}
//         </button>
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <NavLink to={"/login"} className="text-blue-600 hover:underline font-medium">
//               Login
//             </NavLink>
//           </p>
//         </div>
//       </div>
//     </div>

//     // <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 px-4">
//     //     <form
//     //         onSubmit={handleSubmit}
//     //         className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 h-[500px] overflow-y-scroll"
//     //     >
//     //         <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
//     //         Create Your Account
//     //         </h2>

//     //         {['name', 'surname', 'phone', 'email', 'address', 'password', 'referral'].map((field) => (
//     //         <div className="mb-5" key={field}>
//     //             <label className="block text-sm font-medium text-gray-700 mb-1">
//     //             {field === 'referral' ? 'Referral Code (Optional)' : field.charAt(0).toUpperCase() + field.slice(1)}
//     //             </label>
//     //             <input
//     //             type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
//     //             name={field}
//     //             value={formData[field]}
//     //             onChange={handleChange}
//     //             required={field !== 'referral'}
//     //             className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//     //             placeholder={`Enter your ${field}`}
//     //             />
//     //         </div>
//     //         ))}

//     //         {error && (
//     //         <div className="bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-2 rounded mb-4">
//     //             {error}
//     //         </div>
//     //         )}

//     //         <button
//     //         type="submit"
//     //         disabled={loading}
//     //         className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold text-sm py-3 rounded-lg shadow-md"
//     //         >
//     //         {loading ? 'Registering...' : 'Sign Up'}
//     //         </button>
//     //     </form>
//     // </div>

//   );
// };

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    referralCode: '',
    accNo: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ OTP states
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!otpVerified) {
      setError('Please verify OTP before registering.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        console.log('🚨 Signup response:', data);
        setError(data.error || JSON.stringify(data));
      } else {
        const { token } = data;
        localStorage.removeItem('authToken');
        localStorage.setItem('authToken', token);
        navigate('/home');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!formData.phone) {
      setError('Enter phone number first');
      return;
    }
    setOtpLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to send OTP');
      } else {
        setOtpSent(true);
        alert('OTP sent to your phone!');
      }
    } catch (err) {
      setError('Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('Enter the OTP first');
      return;
    }
    setOtpLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'OTP verification failed');
      } else {
        setOtpVerified(true);
        alert('OTP Verified!');
      }
    } catch (err) {
      setError('Failed to verify OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Failed to resend OTP');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg lg3:w-[40%] md6:w-[60%] sm9:w-[80%] w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-2 gap-[20px]'
          id='signUpForm'
        >
          {['name', 'surname', 'phone', 'email', 'address', 'password', 'accNo', 'referral'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 mb-1 capitalize">
                {field === 'referral' ? 'Referral Code (optional)' : field === 'accNo' ? 'Account No.' : field}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field === 'referral' ? 'referralCode' : field}
                value={formData[field === 'referral' ? 'referralCode' : field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                required={field !== 'referral'}
              />

              {/* ✅ Below phone input, show OTP buttons */}
              {field === 'phone' && (
                <div className='flex gap-2 mt-2'>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpLoading}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    {otpSent ? 'Resend OTP' : 'Send OTP'}
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* ✅ OTP input & Verify */}
          {otpSent && (
            <div className="mb-4 col-span-2">
              
              <label className="block text-gray-700 mb-1">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otpLoading}
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-blue-600 hover:underline text-sm ml-[20px]"
              >
                Resend OTP
              </button>
              
            </div>
            
          )}

          {error && <p className="text-red-600 text-sm mb-2 col-span-2">{error}</p>}

        </form>

        <button
          type="submit"
          form='signUpForm'
          className={`w-full ${otpVerified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white font-semibold py-2 px-4 rounded`}
          disabled={loading || !otpVerified}
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <NavLink to={"/login"} className="text-blue-600 hover:underline font-medium">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Signup;

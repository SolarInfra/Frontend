import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Admin = () => {
  // const [formData, setFormData] = useState({
  //   coins: '',
  //   realPrice: '',
  //   productName: '',
  //   discount: '',
  // });
  // const [image, setImage] = useState(null);
  // const [message, setMessage] = useState('');

  // const handleChange = (e) => {
  //   setFormData({ 
  //     ...formData, 
  //     [e.target.name]: e.target.value 
  //   });
  // };

  // const handleFileChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!image) {
  //     setMessage('Please select an image!');
  //     return;
  //   }

  //   const data = new FormData();
  //   data.append('coins', formData.coins);
  //   data.append('realPrice', formData.realPrice);
  //   data.append('productName', formData.productName);
  //   data.append('discount', formData.discount);
  //   data.append('image', image);

  //   try {
  //     const res = await fetch('http://localhost:5000/api/auth/createreward', {
  //       method: 'POST',
  //       body: data,
  //     });

  //     const result = await res.json();
  //     if (res.ok) {
  //       setMessage(`✅ Success: ${result.message}`);
  //     } else {
  //       setMessage(`❌ Error: ${result.error || JSON.stringify(result)}`);
  //     }
  //   } catch (err) {
  //     setMessage('❌ Something went wrong.');
  //     console.error(err);
  //   }
  // };

  const [isOpen, setIsOpen] = useState(true);

  return (
      <div className="flex">
        <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            
            <button onClick={() => setIsOpen(false)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            <NavLink to="/addreward" className="hover:bg-gray-700 p-2 rounded no-underline text-white">Add Reward</NavLink>
            <NavLink to="/admin/withdraw" className="hover:bg-gray-700 p-2 rounded no-underline text-white">Withdraw Requests</NavLink>
            <NavLink to="/reward" className="hover:bg-gray-700 p-2 rounded no-underline text-white">Reward Requests</NavLink>
            <NavLink to="/recharge" className="hover:bg-gray-700 p-2 rounded no-underline text-white">Recharge Requests</NavLink>
          </nav>
        </div>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="bg-gray-800 text-white flex items-center p-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <h1 className="ml-4 text-lg font-bold">Admin Dashboard</h1>
          </header>

          <main className="p-8">
            {/* Page content loads here */}
          </main>
        </div>
      </div>

  );
};

export default Admin;

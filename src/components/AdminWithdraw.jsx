import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const AdminWithdraw = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    
    useEffect(() => {
        const fetchRequests = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/getallwithdraw`);
            const data = await res.json();
            setRequests(data);
        };
        fetchRequests();

        const interval = setInterval(fetchRequests, 10000); // every 10s
        return () => clearInterval(interval);

    }, []);

    const handleApprove = async (id) => {
        if (!window.confirm('Are you sure you want to approve this request?')) return;
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/withdraw/${id}/approve`, {
            method: 'PATCH'
            });
            // Refresh list or optimistically update
            alert('Approved!');
            
        } catch (err) {
            console.error(err);
            alert('Error approving');
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm('Are you sure you want to approve this request?')) return;
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/withdraw/${id}/reject`, {
            method: 'PATCH'
            });
            alert('Rejected!');
        } catch (err) {
            console.error(err);
            alert('Error rejecting');
        }
    };

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
            <NavLink to="/admin/addreward" className="hover:bg-gray-700 p-2 rounded no-underline text-white">Add Reward</NavLink>
            <NavLink to="/admin/withdraw" className="hover:bg-gray-700 p-2 rounded no-underline text-white">Withdraw Requests</NavLink>
            <NavLink to="/admin/reward" className="hover:bg-gray-700 p-2 rounded no-underline text-white">Reward Requests</NavLink>
            <NavLink to="/admin/recharge" className="hover:bg-gray-700 p-2 rounded no-underline text-white">Recharge Requests</NavLink>
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
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Withdraw Requests</h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {requests.map(req => (
                    <div
                        key={req._id}
                        className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                    >
                        <h2 className="text-lg font-semibold mb-2 text-indigo-600">
                        User: {req.user.name}
                        </h2>

                        <div className="text-gray-700 mb-2">
                        <span className="font-medium">Amount:</span> ₹{req.amount}
                        </div>

                        <div className="text-gray-700 mb-2">
                        <span className="font-medium">Bank:</span> {req.accountHolder} / {req.accountNumber} / {req.ifscCode}
                        </div>

                        <div className="text-gray-700 mb-2">
                        <span className="font-medium">Contact:</span> {req.contactNo}
                        </div>

                        <div className="text-gray-700 mb-4">
                        <span className="font-medium">UPI:</span> {req.UPI}
                        </div>

                        <div className={`inline-block px-3 py-1 text-sm rounded-full 
                            ${req.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : req.status === 'Approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`
                            }>
                            {req.status}
                        </div>

                        {req.status === 'Pending' && (
                          <div className="flex gap-2 mt-4">
                              <button
                                  onClick={() => handleApprove(req._id)}
                                  disabled={req.status !== 'Pending'}
                                  className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                              >
                                  Approve
                              </button>
                              <button
                                  onClick={() => handleReject(req._id)}
                                  disabled={req.status !== 'Pending'}
                                  className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                              >
                                  Reject
                              </button>
                          </div>
                        )}
                    </div>
                    ))}
                </div>
            </div>
          </main>
        </div>
      </div>
   
  )
}

export default AdminWithdraw

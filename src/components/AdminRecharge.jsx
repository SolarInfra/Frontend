import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const AdminRecharge = () => {
    const [recharges, setRecharges] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchRecharges = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/allrecharges`);
        const data = await res.json();
        setRecharges(data);
        };

        fetchRecharges();
    }, []);

    const handleApprove = async (id) => {
        await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/recharge/${id}/approve`, { method: 'PATCH' });
        alert('Approved');
    };

    const handleReject = async (id) => {
        await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/recharge/${id}/reject`, { method: 'PATCH' });
        alert('Rejected');
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
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">All Recharges</h2>
                    {recharges.map((r) => (
                        <div key={r._id} className="border p-4 mb-4">

                            <h2 className="text-lg font-semibold mb-2 text-indigo-600">
                                User: {r.user.name}
                            </h2>
                            <div className="text-gray-700 mb-2">
                                <span className="font-medium"> Phone: </span> {r.user.phone}
                            </div>
                            <div className="text-gray-700 mb-2">
                                <span className="font-medium"> Email: </span> {r.user.email}
                            </div>
                            <div className="text-gray-700 mb-2">
                                <span className="font-medium"> Amount: </span> ₹{r.amount}
                            </div>
                            <div className="text-gray-700 mb-2">
                                <span className="font-medium"> Txn ID: </span> {r.txnId}
                            </div>
                            <div className="text-gray-700 mb-2">
                                <span className="font-medium"> Recharged on: </span> {new Date(r.createdAt).toLocaleString()}
                            </div>

                            <div className={`inline-block px-3 py-1 text-sm mt-3 rounded-full 
                                ${r.status === 'Pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : r.status === 'Approved'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`
                                }>
                                {r.status}
                            </div>

                            {r.status === 'Pending' && (
                                <div className="flex gap-2 mt-4">
                                <button 
                                onClick={() => handleApprove(r._id)} 
                                disabled={r.status !== 'Pending'}
                                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">Approve</button>

                                <button 
                                onClick={() => handleReject(r._id)} 
                                disabled={r.status !== 'Pending'}
                                className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50">Reject</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
              </main>
            </div>
    </div>
  )
}

export default AdminRecharge

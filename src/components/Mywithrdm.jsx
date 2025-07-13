import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from "react";

const Mywithrdm = () => {

  const [withdrawals, setWithdrawals] = useState([]);
  const [active, setActive] = useState("first"); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [withdrawRes, redeemRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/mywithdrawals`, {
            headers: {
              authtoken: localStorage.getItem('authToken')
            }
          }),
        ]);

        const withdrawData = await withdrawRes.json();

        setWithdrawals(withdrawData);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        
         <div className='bg-gradient-to-r from-blue-400 to-indigo-600 min-h-[100vh] py-[20px] pb-[100px] flex flex-col justify-center items-center relative font-poppins'>

        <div className='md8:w-[60%] w-[80%] bg-slate-100 rounded-xl border-[1px] border-slate-700 flex flex-col relative mt-[4px] min-h-[70vh]'>

          <div className="opt flex items-center w-full bg-slate-100 mb-[20px] rounded-tr-xl rounded-tl-xl border-t-[2px] border-t-blue-400">
            <div onClick={() => setActive("first")} className={`py-[15px] w-full flex justify-center items-center font-semibold rounded-xl flex-col relative`}>
              <h1 className='m-0 text-[16px] font-bold'>Withdrawals</h1>
              <div className={`h-[3px] w-[40%] bg-blue-400 absolute bottom-0 ${active === "second" ? "hidden" : "block"}`}></div>
            </div>
          </div>

          <div className='h-full w-[80%]'></div>
          {active === "first" && (
            <div className="h-full flex flex-col items-center">
              <h2 className="text-xl font-bold mt-8 mb-4">My Withdrawals</h2>
              <div  className="w-full h-[420px] overflow-y-scroll super-thin-scrollbar scrollbar-thumb-slate-500 scrollbar-track-gray-200 md4:grid md4:grid-cols-2 justify-center py-[20px] gap-[10px] px-[20px] mb-[20px]">
                
                {withdrawals.length === 0 && <p>No withdrawal requests yet.</p>}
                {withdrawals.map((w) => (
                    <div key={w._id} className="border p-4 mb-2 rounded border-black max-h-fit">
                      <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold m-0'>Amount:</h1> ₹{w.amount}</p>
                      <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold'>Date:</h1> {new Date(w.createdAt).toLocaleString()}</p>
                      <div className={`inline-block px-3 py-1 text-sm rounded-full 
                        ${w.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : w.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`
                        }>
                        {w.status}
                    </div>
                    </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>






      {/* <div className="p-6">
        <h2 className="text-xl font-bold mb-4">My Withdrawals</h2>
        {withdrawals.length === 0 && <p>No withdrawal requests yet.</p>}
        {withdrawals.map((w) => (
            <div key={w._id} className="border p-4 mb-2 rounded">
            <p>Amount: ₹{w.amount}</p>
            <p>Status: {w.status}</p>
            <p>Date: {new Date(w.createdAt).toLocaleString()}</p>
            </div>
        ))}

        <h2 className="text-xl font-bold mt-8 mb-4">My Reward Redemptions</h2>
        {redemptions.length === 0 && <p>No redemptions yet.</p>}
        {redemptions.map((r) => (
            <div key={r._id} className="border p-4 mb-2 rounded">
            <p>Reward: {r.reward?.productName}</p>
            <p>Coins: {r.reward?.coins}</p>
            <p>Status: {r.status}</p>
            <p>Date: {new Date(r.createdAt).toLocaleString()}</p>
            </div>
        ))}
        </div> */}

        <Navbar/>

    </div>
  )
}

export default Mywithrdm

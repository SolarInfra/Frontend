import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from "react";

const Myrdm = () => {

    const [redemptions, setRedemptions] = useState([]);
    const [active, setActive] = useState("second"); 
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [redeemRes] = await Promise.all([
            fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/myredemptions`, {
              headers: {
                authtoken: localStorage.getItem('authToken')
              }
            }),
          ]);
    
          const redeemData = await redeemRes.json();
    
          setRedemptions(redeemData);
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

                <div onClick={() => setActive("second")} className={`py-[15px] w-full flex justify-center items-center font-semibold rounded-xl flex-col relative `}>
                <h1 className='m-0 text-[16px] font-bold'>Redeems</h1>
                <div className={`h-[3px] w-[40%] bg-blue-400 absolute bottom-0 ${active === "first" ? "hidden" : "block"}`}></div>
                </div>
            </div>

            <div className='h-full w-[80%]'></div>

            {active === "second" && (
            <div className="rwrd h-full flex flex-col items-center">
                <div className="w-full h-[420px] overflow-y-scroll super-thin-scrollbar scrollbar-thumb-slate-500 scrollbar-track-gray-200 md4:grid md4:grid-cols-2 justify-center py-[20px] gap-[10px] px-[20px] mb-[20px]">

                    {redemptions.length === 0 && <p>No redemptions yet.</p>}
                    {redemptions.map((r) => (
                        <div key={r._id} className="border p-4 mb-2 rounded border-black max-h-fit">
                            <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold'>Amount:</h1> {r.reward?.productName}</p>
                            <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold'>Coins:</h1> {r.reward?.coins}</p>
                            <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold'>Date:</h1> {new Date(r.createdAt).toLocaleString()}</p>
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
                        </div>
                    ))}
                </div>
            </div>
            )}
            
            </div>

        </div>

        <Navbar/>

    </div>
  )
}

export default Myrdm

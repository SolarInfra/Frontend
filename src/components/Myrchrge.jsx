import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from "react";

const Myrchrge = () => {

    const [recharges, setRecharges] = useState([]);
    const [user, setUser] = useState(null);
    const [active, setActive] = useState("first"); 
    
    useEffect(() => {
    const fetchData = async () => {
        try {
        const rechargeRes = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/myrecharges`, {
            headers: {
            authtoken: localStorage.getItem('authToken')
            }
        });

        const rechargeData = await rechargeRes.json();

        setRecharges(rechargeData.recharges); // ✅ unpack
        setUser(rechargeData.user);           // ✅ save user too

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
                <h1 className='m-0 text-[16px] font-bold'>Recharges</h1>
                <div className={`h-[3px] w-[40%] bg-blue-400 absolute bottom-0 ${active === "second" ? "hidden" : "block"}`}></div>
                </div>
            </div>

            <div className='h-full w-[80%]'></div>
            {active === "first" && (
                <div className="h-full flex flex-col items-center">
                <div  className="w-full h-[420px] overflow-y-scroll super-thin-scrollbar scrollbar-thumb-slate-500 scrollbar-track-gray-200 md4:grid md4:grid-cols-2 justify-center py-[20px] gap-[10px] px-[20px] mb-[20px]">
                    
                    {recharges.length === 0 && <p>No recharge requests yet.</p>}
                    {recharges.map((r) => (
                    <div key={r._id} className="border p-4 mb-2 rounded border-black max-h-fit">
                        {/* <p>User: {user?.name} {user?.surname}</p>
                        <p>Phone: {user?.phone}</p> */}
                        <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold'>AccNo:</h1> {user?.accNo}</p>
                        <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold'>ifsc:</h1> {user?.ifsc}</p>
                        <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold'>Phonepe Or GooglePay:</h1> {user?.phonepeNo}</p>
                        <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold'>Amount:</h1> ₹{r.amount}</p>
                        <p className='flex gap-[8px]'><h1 className='text-[12px] font-semibold'>Transaction ID:</h1> {r.txnId}</p>
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

export default Myrchrge

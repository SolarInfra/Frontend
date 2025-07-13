import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Redeem = () => {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState("first"); 
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const [rewards, setRewards] = useState([]);

    useEffect(() => {
      const fetchRewards = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/getrewards`);
          setRewards(res.data);
        } catch (err) {
          console.error('Error fetching rewards:', err);
        }
      };

      fetchRewards();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
          const token = localStorage.getItem("authToken");
    
          if (!token) {
            console.warn("No auth token found. Redirecting or skipping fetch.");
            navigate('/');
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
            } else {
              console.error("Fetch failed:", data);
              // Optionally: localStorage.removeItem("authToken");
            }
          } catch (err) {
            console.error("Fetch error:", err);
          }
        };
    
        fetchUser();
    }, [navigate]);

    const handleCopy = () => {
    const codeToCopy = user.myReferralCode;
    navigator.clipboard.writeText(codeToCopy)
      .then(() => {
        setShowToast(true); // Show the toast
        setTimeout(() => {
          setShowToast(false); // Hide after 2 seconds
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });

    };

    const handleRedeem = async (rewardId) => {
      if (!window.confirm('Are you sure you want to redeem this reward?')) return;

      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/products/redeem/${rewardId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem('authToken'),
          },
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || 'Error redeeming reward.');
        } else {
          alert(data.message || 'Reward redeemed!');
          // Optional: refresh balance, rewards, or navigate
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong.');
      }
    };


  return (
    <div className='relative'>

      {showToast && (
        <div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-800 bg-white divide-x rtl:divide-x-reverse divide-gray-600 rounded-lg shadow-sm   absolute top-10 right-10 z-50" role="alert">
          <svg fill="#000011" className='w-6 h-6' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 4 4 L 4 24 L 11 24 L 11 22 L 6 22 L 6 6 L 18 6 L 18 7 L 20 7 L 20 4 Z M 12 8 L 12 28 L 28 28 L 28 8 Z M 14 10 L 26 10 L 26 26 L 14 26 Z"/></svg>
          <div class="ps-4 text-sm font-normal">Referal code copied successfully.</div>
        </div>
      )}
      
      <div className='bg-gradient-to-r from-blue-400 to-indigo-600 min-h-[100vh] py-[20px] pb-[100px] flex flex-col items-center relative font-poppins'>

        {user ? (
          <div className='lg1:w-[70%] sm6:w-[80%] w-[90%] bg-slate-100 py-[20px] rounded-xl border-[1px] border-slate-700 flex items-center relative'>

              <div className=' w-[50%] flex flex-col justify-center items-start px-[50px] md6:pr-[50px] md3:pr-[30px] pr-0 pl-[20px] sm5:pl-[50px] gap-[8px]'>

                <div className='flex items-center gap-[8px]'>

                  <div><h1 className='md7:text-[12px] sm6:text-[10px] text-[10px] font-semibold m-0'>Your Ref code :</h1></div>

                  <div className='flex justify-center items-center gap-[4px]'>

                    <div><h1 className='md7:text-[14px] sm5:text-[12px] text-[10px] font-bold m-0'>{user.myReferralCode}</h1></div>

                    <div onClick={handleCopy} className=''> 
                      <svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 4 4 L 4 24 L 11 24 L 11 22 L 6 22 L 6 6 L 18 6 L 18 7 L 20 7 L 20 4 Z M 12 8 L 12 28 L 28 28 L 28 8 Z M 14 10 L 26 10 L 26 26 L 14 26 Z"/></svg>
                    </div>

                  </div>

                </div>

                <div className='flex items-center gap-[8px]'>

                  <div><h1 className='md7:text-[12px] sm6:text-[10px] text-[10px] font-semibold m-0'>People refered :</h1></div>

                  <div className='flex justify-center items-center gap-[4px]'>

                    <div><h1 className='md7:text-[12px] sm6:text-[10px] text-[10px] font-bold m-0'>{user.referedpeople}</h1></div>

                  </div>

                </div>

              </div>

              <div className='flex items-center gap-[2px] w-[50%] justify-end px-[50px] md6:pl-[50px] md3:pl-[30px] pl-0 pr-[20px] sm5:pr-[50px]'>

                <div className='mr-[8px]'><h1 className='md3:text-[16px] text-[12px] font-bold m-0'>Coins :</h1></div>

                <div>
                  <img src="/icons/coin.svg" className='md3:w-[24px] w-[20px] md3:h-[24px]  h-[20px]' alt="" />
                </div>

                <div><h1 className='md3:text-[16px] text-[12px] font-bold m-0'>{user.refcoins}</h1></div>

              </div>       

          </div>
      ) : (
        <p>Loading user data...</p>
      )}

        

        <div className='lg1:w-[70%] sm6:w-[80%] w-[90%] bg-slate-100 rounded-xl border-[1px] border-slate-700 flex flex-col relative mt-[4px] min-h-[70vh]'>

          {/* <div className='flex items-center justify-center w-full'>
            <div className='w-[30%] py-[6px] px-[22px] flex items-center justify-center border-2 border-blue-400 rounded-full bg-slate-100 shadow-xl shadow-blue-200 my-[30px]'>
              <h1 className='font-bold text-[22px]'>Redeem</h1>
            </div>
          </div> */}

          <div className="opt flex items-center w-full bg-slate-100 mb-[20px] rounded-tr-xl rounded-tl-xl border-t-[2px] border-t-blue-400">
            <div onClick={() => setActive("first")} className={`py-[10px] w-[50%] flex justify-center items-center font-semibold rounded-xl flex-col relative`}>
              <h1 className='m-0 text-[16px] font-bold'>Cash</h1>
              <div className={`h-[3px] w-[40%] bg-blue-400 absolute bottom-0 ${active === "second" ? "hidden" : "block"}`}></div>
            </div>
            <div onClick={() => setActive("second")} className={`py-[10px] w-[50%] flex justify-center items-center font-semibold rounded-xl flex-col relative `}>
              <h1 className='m-0 text-[16px] font-bold'>Gifts</h1>
              <div className={`h-[3px] w-[40%] bg-blue-400 absolute bottom-0 ${active === "first" ? "hidden" : "block"}`}></div>
            </div>
          </div>

          <div className='h-full w-[80%]'></div>
          {active === "first" && (
            <div className="h-full flex flex-col items-center">
              <div  className="w-full h-[420px] overflow-y-scroll super-thin-scrollbar scrollbar-thumb-slate-500 scrollbar-track-gray-200 md4:grid md4:grid-cols-2 justify-center py-[20px] gap-[10px] px-[20px] mb-[20px]">
                {rewards.filter(item => item.productName === 'cash').map((rewards, index) => (
                  <a
                    href={rewards.link}
                    key={rewards.index}
                    className="flex flex-col items-center sm3:w-[80%] w-[95%] mx-auto mb-[28px] pt-[20px] border border-black rounded-xl shadow-sm no-underline hover:bg-slate-300 bg-zinc-100">

                  <div className="flex flex-col p-4 w-full items-center justify-center border-b-[2px] border-b-gray-500 gap-[8px]">

                    <div className=''>
                      <h5 className="mb-2 text-[44px] text-center font-bold bg-gradient-to-r from-cyan-300 via-violet-600 to-red-400 bg-clip-text text-transparent">
                        {rewards.realPrice}
                      </h5>
                    </div>

                    {/* <div className="mb-3 font-normal flex items-center justify-center ">
                      <h5 className="mb-2 text-[16px] font-bold text-black">
                        {rewards.realPrice}
                      </h5>
                    </div> */}

                  </div>

                  <div className='flex items-center py-[20px]'>                
                    <div>
                        <img src="/icons/coin.svg" className='w-[24px] h-[24px]' alt="" />
                    </div>

                    <h1 className='m-0 text-[16px] font-bold text-black'>{rewards.coins}</h1>
                  </div>

                  <button
                    onClick={() => handleRedeem(rewards._id)}
                    className="py-2 mb-[20px] w-[50%] bg-blue-500 text-white text-[13px] rounded hover:bg-blue-600 transition"
                  >
                    Redeem
                  </button> 

                  </a>
                ))}
              </div>
            </div>
          )}

          {active === "second" && (
          <div className="rwrd h-full flex flex-col items-center">
            <div className="w-full h-[420px] overflow-y-scroll super-thin-scrollbar scrollbar-thumb-slate-500 scrollbar-track-gray-200 md4:grid md4:grid-cols-2 justify-center py-[20px] gap-[10px] px-[20px] mb-[20px]">

              {rewards.filter(reward => reward.productName?.toLowerCase() !== 'cash').slice().reverse().sort((a, b) => {
                  return Number(a.coins) - Number(b.coins);
                }).map((reward, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center md2:w-[80%] w-[95%] mx-auto mb-[28px] pt-[20px] bg-zinc-100 border border-black rounded-xl shadow-sm no-underline hover:bg-slate-300 hover:shadow-xl hover:shadow-black relative"
                >
                  <img
                    className=" md4:h-[150px] sm4:h-[180px] h-[130px] w-auto rounded-t-lg border-b-[2px] border-slate-400"
                    src={`${process.env.REACT_APP_BACKEND_API_URL}/${reward.image}`}
                    alt=""
                  />

                  <div className="flex flex-col p-4 w-full items-center justify-center border-b-[2px] border-b-gray-500 gap-[8px]">

                    <div className=''>
                      <h5 className="mb-2 text-[14px] text-center font-semibold text-black">
                        {reward.productName}
                      </h5>
                    </div>

                    <div className="mb-3 font-normal flex items-center justify-center ">
                      <h5 className="mb-2 text-[16px] font-bold text-black">
                        ₹{reward.realPrice}
                      </h5>
                    </div>

                  </div>

                  <div className='flex items-center py-[20px] gap-[4px] relative'>                
                    <div>
                        <img src="/icons/coin.svg" className='w-[24px] h-[24px]' alt="" />
                    </div>

                    <h1 className='m-0 text-[16px] font-bold text-black'>{reward.coins}</h1>
                  </div>

                  <button
                    onClick={() => handleRedeem(reward._id)}
                    className="py-2 mb-[20px] w-[50%] bg-blue-500 text-white text-[13px] rounded hover:bg-blue-600 transition"
                  >
                    Redeem
                  </button> 

                  {parseFloat(reward.discount) !== 0 && (
                    <div className='ofr absolute bg-red-600 p-[24px] right-[3%] top-[3%] rounded-full flex items-center justify-center'>
                      <h1 className='text-[16px] font-bold text-orange-100 m-0 absolute'>
                        off
                        {/*<span className='text-[10px]'>off</span>*/}
                      </h1>
                    </div>
                  )}



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

export default Redeem



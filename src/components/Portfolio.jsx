import React from 'react';
// import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
    const [userProducts, setUserProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/userproduct/getproducts`, {
            headers: {
                'authtoken': localStorage.getItem('authToken') // Only needed if the route is protected
            }
            });
            console.log(response.data)
            setUserProducts(response.data);
            
        } catch (error) {
            console.error('Error fetching user products:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchUserProducts();
    }, []);


    // const formatDateTime = (dateString) => {
    //     const date = new Date(dateString);

    //         return date.toLocaleString('en-GB', {
    //             day: 'numeric',
    //             month: 'long',
    //             year: 'numeric',
    //             hour: '2-digit',
    //             minute: '2-digit',
    //             hour12: false,
    //         }).replace(',', ' at');
    // };


//     const getEarningsAndExpiry = (product, purchasedAt) => {
//   const parseIncomeString = (str) => {
//     let num = str.toLowerCase().trim();
//     if (num.includes('k')) return parseFloat(num.replace('k', '')) * 1000;
//     if (num.includes('l')) return parseFloat(num.replace('l', '')) * 100000;
//     if (num.includes('cr')) return parseFloat(num.replace('cr', '')) * 10000000;
//     return parseFloat(num);
//   };

//   const dailyIncome = parseIncomeString(product.dailyIncome || '0');
//   const durationDays = parseInt(product.duration.replace(/[^\d]/g, '') || '0');

//   const purchaseDate = new Date(purchasedAt);
//   const utcPurchase = new Date(purchaseDate.getUTCFullYear(), purchaseDate.getUTCMonth(), purchaseDate.getUTCDate());

//   const today = new Date();
//   const utcToday = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

//   const daysPassed = Math.floor((utcToday - utcPurchase) / (1000 * 60 * 60 * 24));
//   const earnings = Math.min(daysPassed, durationDays) * dailyIncome;

//   const expiryDate = new Date(utcPurchase);
//   expiryDate.setUTCDate(expiryDate.getUTCDate() + durationDays);

//   return {
//     earnings: earnings.toFixed(2),
//     expiry: expiryDate.toISOString(),
//   };
// };



// const getEarningsAndExpiry = (product, purchasedAt) => {
//   const parseIncomeString = (str) => {
//     let num = str.toLowerCase().trim();
//     if (num.includes('k')) return parseFloat(num.replace('k', '')) * 1000;
//     if (num.includes('l')) return parseFloat(num.replace('l', '')) * 100000;
//     if (num.includes('cr')) return parseFloat(num.replace('cr', '')) * 10000000;
//     return parseFloat(num);
//   };

//   const dailyIncome = parseIncomeString(product.dailyIncome || '0');
//   const durationDays = parseInt(product.duration.replace(/[^\d]/g, '') || '0');

//   const purchaseDate = new Date(purchasedAt);
//   const now = new Date();

//   // Calculate the exact milliseconds passed
//   const msPassed = now.getTime() - purchaseDate.getTime();

//   // Convert to days (with decimal)
//   const exactDaysPassed = msPassed / (1000 * 60 * 60 * 24);

//   // We only want to credit full days that have passed
//   const fullDays = Math.min(Math.floor(exactDaysPassed), durationDays);

//   const earnings = fullDays * dailyIncome;

//   // Calculate expiry based on original purchase timestamp
//   const expiryDate = new Date(purchaseDate);
//   expiryDate.setDate(purchaseDate.getDate() + durationDays);

//   return {
//     earnings: earnings.toFixed(2),
//     expiry: expiryDate.toISOString(),
//   };
// };

const getEarningsAndExpiry = (product, purchasedAt) => {
  const parseIncomeString = (str) => {
    let num = str.toLowerCase().trim();
    if (num.includes('k')) return parseFloat(num.replace('k', '')) * 1000;
    if (num.includes('l')) return parseFloat(num.replace('l', '')) * 100000;
    if (num.includes('cr')) return parseFloat(num.replace('cr', '')) * 10000000;
    return parseFloat(num);
  };

  const dailyIncome = parseIncomeString(product.dailyIncome || '0');
  const durationDays = parseInt(product.duration.replace(/[^\d]/g, '') || '0');

  const purchaseDate = new Date(purchasedAt);
  const now = new Date();

  const msInDay = 1000 * 60 * 60 * 24;
  const msPassed = now.getTime() - purchaseDate.getTime();
  const daysPassed = Math.floor(msPassed / msInDay);

  const earnings = Math.min(daysPassed, durationDays) * dailyIncome;

  const expiryDate = new Date(purchaseDate.getTime() + durationDays * msInDay);

  return {
    earnings: earnings.toFixed(2),
    expiry: expiryDate.toISOString(),
  };
};




const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

  return (
    <div className='bg-gradient-to-r from-blue-400 to-indigo-600 py-[28px] pb-[100px] w-full font-poppins min-h-[100vh]'>

        <div className='flex flex-col items-center justify-center'>

             <div className='py-[6px] px-[28px] flex items-center justify-center border-2 border-blue-400 rounded-full bg-slate-100 shadow-xl my-[20px]'>
                <h1 className='font-bold sm3:text-[28px] text-[22px] m-0'>My Portfolio</h1>
            </div>

            <div className='xl1:w-[70%] sm7:w-[80%] w-[90%] grid md4:grid-cols-2 grid-cols-1 xl1:flex flex-col items-center justify-center bg-slate-100 py-[36px] rounded-3xl border-[1px] border-slate-700 px-[20px] xl1:px-0 gap-[20px] xl1:gap-0'>
               

                {userProducts.filter(item => item.product && item.user).length === 0 ? (
                <div className="text-center text-gray-500 font-semibold my-10 text-lg">
                    No plans purchased
                </div>
                ) : (userProducts.filter((item) => item.product && item.user).map((item) => {
                    const { earnings, expiry } = getEarningsAndExpiry(item.product, item.purchasedAt);
                    return(
                        <div
                            key={item._id}
                            className={`Product w-full flex flex-col items-center justify-center relative my-[20px]`}
                        >
                            <div className='Product xl1:w-[80%] w-full bg-zinc-100 xl1:flex items-center rounded-tl-[10px] rounded-tr-[10px] p-[2px] hover:shadow-2xl shadow-blue-200 transition duration-300 border-[1px] border-blue-400 mt-[24px]'>

                                <div className="img w-auto">
                                <img className='xl1:h-[130px] xl1:w-[300px] h-[200px] w-full xl1:rounded-tl-[10px] xl1:rounded-bl-[10px] rounded-tl-[10px] rounded-tr-[10px]' src="/images/product_img.jpg" alt="" />
                                </div>

                                <div className="cont xl1:ml-[28px] xl1:px-0 pt-[14px] xl1:pt-0 px-[20px] xl1:flex items-center w-full h-full">

                                    <div className='xl1:w-[80%] w-[100%] h-[70%] flex justify-center text-blue-500`'>

                                        <div className='flex flex-col gap-[0px] w-[50%] justify-center'>

                                            <div className="nm">
                                                <h1 className='xl1:text-[26px] sm3:text-[22px] text-[18px] font-bold'>{item.product.productName}</h1>
                                            </div>

                                            <div className="cycl flex mb-[4px] gap-[4px]">
                                                <div>
                                                <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>Income cycle:</h1>
                                                </div>
                                                <div>
                                                <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>{item.product.duration}</h1>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='flex flex-col justify-center items-end xl1:mr-[28px] w-[50%] gap-[10px]'>
                                        
                                        <div className="dlyincm flex gap-[6px]">
                                            <div>
                                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>Daily Income:</h1>
                                            </div>
                                            <div>
                                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>₹{item.product.dailyIncome}</h1>
                                            </div>
                                        </div>
                                        <div className="ttlrvn flex gap-[6px]">
                                            <div>
                                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>Total Revenue:</h1>
                                            </div>
                                            <div>
                                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>₹{item.product.totalReturn}</h1>
                                            </div>
                                        </div>
                                        </div>

                                    </div>

                                    <div className=' w-[20%] h-[65%] xl1:block hidden justify-center items-center border-l-2 border-l-blue-400'>
                                        <div className="prc flex justify-center items-center">
                                        {/* <div>
                                            <h1 className='text-[18px]'>Price:</h1>
                                        </div> */}
                                        <div>
                                            <h1 className='text-[20px] font-bold'>₹{item.product.price}</h1>
                                        </div>
                                        </div>
                                    </div>

                                    <div className='my-[10px] px-[10px] mt-[20px] xl1:mt-0 xl1:my-0 xl1:px-0 flex justify-center'>

                                        <div className=' xl1:w-[20%] w-auto h-[65%] xl1:hidden block justify-center items-center xl1:border-l-2 xl1:border-l-blue-400 xl1:px-0'>

                                            <div className="prc flex justify-center items-center">
                                            <div>
                                                <h1 className='text-[20px] font-bold'>₹{item.product.price}</h1>
                                            </div>
                                            </div>
                                            
                                        </div>

                                        {/* <button
                                        onClick={() => {
                                            setSelectedProduct(product); // store the whole product
                                            setShowConfirmModal(true);   // show modal
                                        }}
                                        className="px-4 py-2 mr-[8px] bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        >
                                        Buy
                                        </button>  */}

                                    </div>

                                </div>

                            </div>

                            {/* <div className='h-[2px] w-[60%] bg-blue-400 absolute bottom-[27%]'></div> */}

                            <div className="desc xl1:w-[80%] w-full bg-zinc-100 xl1:flex xl1:justify-around grid grid-rows-3 justify-center items-center border-[1px] border-blue-400 border-t-[0px] rounded-bl-[10px] rounded-br-[10px] py-[22px]">
                                <div className='flex gap-[8px] sm3:text-[13px] text-[11px] font-semibold justify-center'>
                                    <div><h1 className='font-bold sm3:text-[13px] text-[11px]'>Purchased At:</h1></div>
                                    <div>{formatDateTime(item.purchasedAt)}</div>
                                </div>
                                <div className='flex gap-[8px] sm3:text-[13px] text-[11px] font-semibold justify-center'>
                                    <div><h1 className='font-bold sm3:text-[13px] text-[11px]'>Expires At:</h1></div>
                                    <div>{formatDateTime(expiry)}</div>
                                </div>
                                <div className='flex gap-[8px] sm3:text-[13px] text-[11px] font-semibold justify-center'>
                                    <div><h1 className='font-bold sm3:text-[13px] text-[11px]'>Income Generated:</h1></div>
                                    <div>₹{earnings}</div>
                                </div>
                            </div>

                        </div>
                    )
                
                
                }))}

                {/* {userProducts.filter((item) => item.product && item.user).map((item) => {
                    const { earnings, expiry } = getEarningsAndExpiry(item.product, item.purchasedAt);
                    return(
                        <div
                        key={item._id}
                        className={`Product w-full flex flex-col items-center justify-center relative my-[20px]`}
                    >
                        <div className='w-[80%] bg-zinc-100 flex items-center rounded-[10px] p-[2px] pb-[40px] hover:shadow-2xl shadow-black transition duration-300 border-[1px] border-blue-400 border-b-[0px] rounded-bl-none rounded-br-none mt-[24px]'>

                        <div className="img w-auto">
                        <img className='h-[130px] w-[300px] rounded-tl-[10px]' src="/images/product_img.jpg" alt="" />
                        </div>

                        <div className="cont ml-[28px] flex items-center w-full h-full">

                        <div className='w-[80%] h-[70%] flex text-blue-500'>

                            <div className='flex flex-col gap-[0px] w-[50%] justify-center'>

                            <div className="nm">
                                <h1 className='text-[26px] font-bold'>{item.product.productName}</h1>
                            </div>

                            <div className="cycl flex mb-[4px] gap-[4px]">
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>Income cycle:</h1>
                                </div>
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>{item.product.duration}</h1>
                                </div>
                            </div>

                            </div>

                            <div className='flex flex-col justify-center items-end mr-[28px] w-[50%] gap-[10px]'>
                            
                            <div className="dlyincm flex gap-[6px]">
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>Daily Income:</h1>
                                </div>
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>₹{item.product.dailyIncome}</h1>
                                </div>
                            </div>
                            <div className="ttlrvn flex gap-[6px]">
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>Total Revenue:</h1>
                                </div>
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>₹{item.product.totalReturn}</h1>
                                </div>
                            </div>
                            </div>

                        </div>

                        <div className=' w-[20%] h-[65%] flex justify-center items-center border-l-2 border-l-blue-400'>
                            <div className="prc flex justify-center items-center">
                             <div>
                                <h1 className='text-[18px]'>Price:</h1>
                            </div> 
                            <div>
                                <h1 className='text-[20px] font-bold'>₹{item.product.price}</h1>
                            </div>
                            </div>
                        </div>

                        </div>

                    </div>

                    <div className='h-[2px] w-[60%] bg-blue-400 absolute bottom-[27%]'></div>

                        <div className="desc flex w-[80%] bg-zinc-100 justify-around border-[1px] border-blue-400 border-t-[0px] rounded-bl-[10px] rounded-br-[10px] py-[22px]">
                            <div className='flex gap-[8px] text-[13px] font-semibold'>
                                <div>Purchased At:</div>
                                <div>{formatDateTime(item.purchasedAt)}</div>
                            </div>
                            <div className='flex gap-[8px] text-[13px] font-semibold'>
                                <div>Expires At:</div>
                                <div>{formatDateTime(expiry)}</div>
                            </div>
                            <div className='flex gap-[8px] text-[13px] font-semibold'>
                                <div>Income Generated:</div>
                                <div>₹{earnings}</div>
                            </div>
                        </div>

                    </div>
                    )
                    
                    
                })} */}
                    
                {/* <div className='Product w-full flex flex-col items-center justify-center relative my-[20px] '>

                    <div className='w-[80%] bg-zinc-100 flex items-center rounded-[10px] p-[2px] pb-[40px] hover:shadow-2xl shadow-black transition duration-300 border-[1px] border-blue-400 border-b-[0px] rounded-bl-none rounded-br-none mt-[24px]'>

                        <div className="img w-auto">
                        <img className='h-[130px] w-[300px] rounded-tl-[10px]' src="/images/product_img.jpg" alt="" />
                        </div>

                        <div className="cont ml-[28px] flex items-center w-full h-full">

                        <div className='w-[80%] h-[70%] flex text-blue-400'>

                            <div className='flex flex-col gap-[0px] w-[50%] justify-center'>

                            <div className="nm">
                                <h1 className='text-[26px] font-bold'>Micro</h1>
                            </div>

                            <div className="cycl flex mb-[4px] gap-[4px]">
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>Income cycle:</h1>
                                </div>
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>30 Days</h1>
                                </div>
                            </div>

                            </div>

                            <div className='flex flex-col justify-center items-end mr-[28px] w-[50%] gap-[10px]'>
                            
                            <div className="dlyincm flex gap-[6px]">
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>Daily Income:</h1>
                                </div>
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>₹100.00</h1>
                                </div>
                            </div>
                            <div className="ttlrvn flex gap-[6px]">
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>Total Revenue:</h1>
                                </div>
                                <div>
                                <h1 className='text-[15px] font-semibold m-0'>₹1500.00</h1>
                                </div>
                            </div>
                            </div>

                        </div>

                        <div className=' w-[20%] h-[65%] flex justify-center items-center border-l-2 border-l-blue-400'>
                            <div className="prc flex justify-center items-center">

                            <div>
                                <h1 className='text-[20px] font-bold'>₹500.00</h1>
                            </div>
                            </div>
                        </div>

                        </div>

                    </div>

                    <div className='h-[2px] w-[60%] bg-blue-400 absolute bottom-[27%]'></div>

                    <div className="desc flex w-[80%] bg-zinc-100 justify-around border-[1px] border-blue-400 border-t-[0px] rounded-bl-[10px] rounded-br-[10px] py-[22px]">
                        <div className='flex gap-[4px] text-[15px] font-semibold'>
                            <div>Purchased At:</div>
                            <div>1 June 2025 at 19:05</div>
                        </div>
                        <div className='flex gap-[4px] text-[15px] font-semibold'>
                            <div>Expires At:</div>
                            <div>1 July 2025 at 19:05</div>
                        </div>
                        <div className='flex gap-[4px] text-[15px] font-semibold'>
                            <div>Income Generated:</div>
                            <div>1500</div>
                        </div>
                    </div>


                </div> */}

                <HashLink smooth to="/home#products" className='no-underline'>

                {/* <a href="/" className='no-underline'> */}
                    <div className='py-[6px] px-[18px] border-[2px] border-blue-400 rounded-full flex items-center justify-center mt-[30px] hover:bg-blue-400 hover:text-white text-blue-400'>
                        <h1 className='text-[18px] text-blue font-semibold leading-none m-0'>Explore other plans?</h1>
                    </div>
                {/* </a> */}
                </HashLink>
            </div>
        </div>
      
        <Navbar/>

    </div>
  )
}

export default Portfolio

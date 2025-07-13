import React from 'react';
import { NavLink } from 'react-router-dom';
import Homecarousel from './ocomponents/Homecarousel';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from "react";



const Home = () => {

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    // Fetch product data
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/products/all`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
      const updateIncome = async () => {
          await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/updatetotalincome`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              authtoken: localStorage.getItem('authToken'),
          },
          });
      };

      updateIncome();
    }, []);

  // useEffect(() => {
  //     const updateIncome = async () => {
  //         await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/updatefixedincome`, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             authtoken: localStorage.getItem('authToken'),
  //         },
  //         });
  //     };

  //     updateIncome();
  //   }, []);

  const handleBuy = async (productId) => {
    try {
      console.log(productId)
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/userproduct/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Product purchased successfully!');
    } else {
      alert(data.error || 'Failed to purchase product');
    }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Something went wrong!');
    }
  };

  const formatBalance = (amount) => {
    const num = parseInt(amount, 10);

    if (num >= 10000000) {
      return (num / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      return num.toString();
    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-400 to-indigo-600 h-full w-full pb-[100px] font-poppins '>

      <Homecarousel/>

      {user ? (
        <div> 

          <div className='flex justify-center bg-slate-100 border-b-2 border-gray-300'>
            <div className='flex justify-between items-center md2:w-[60%] w-[80%] my-[12px]'>

              <NavLink to={'/recharge'}>
                <div className='flex flex-col items-center gap-[6px]'>

                  <div className='flex justify-center items-center p-[10px] bg-blue-400 rounded-full shadow-md hover:shadow-black border-[1px] border-blue-900'>
                    <svg class="md1:w-12 md1:h-12 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M9 15a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm3.845-1.855a2.4 2.4 0 0 1 1.2-1.226 1 1 0 0 1 1.992-.026c.426.15.809.408 1.111.749a1 1 0 1 1-1.496 1.327.682.682 0 0 0-.36-.213.997.997 0 0 1-.113-.032.4.4 0 0 0-.394.074.93.93 0 0 0 .455.254 2.914 2.914 0 0 1 1.504.9c.373.433.669 1.092.464 1.823a.996.996 0 0 1-.046.129c-.226.519-.627.94-1.132 1.192a1 1 0 0 1-1.956.093 2.68 2.68 0 0 1-1.227-.798 1 1 0 1 1 1.506-1.315.682.682 0 0 0 .363.216c.038.009.075.02.111.032a.4.4 0 0 0 .395-.074.93.93 0 0 0-.455-.254 2.91 2.91 0 0 1-1.503-.9c-.375-.433-.666-1.089-.466-1.817a.994.994 0 0 1 .047-.134Zm1.884.573.003.008c-.003-.005-.003-.008-.003-.008Zm.55 2.613s-.002-.002-.003-.007a.032.032 0 0 1 .003.007ZM4 14a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Zm3-2a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm6.5-8a1 1 0 0 1 1-1H18a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-.796l-2.341 2.049a1 1 0 0 1-1.24.06l-2.894-2.066L6.614 9.29a1 1 0 1 1-1.228-1.578l4.5-3.5a1 1 0 0 1 1.195-.025l2.856 2.04L15.34 5h-.84a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                    </svg>
                  </div>

                  <h1 className='md1:text-[12px] text-[10px] font-bold text-black'>Recharge</h1>

                </div>
              </NavLink>

              <NavLink to={'/withdrawc'}>
                <div className='flex flex-col items-center gap-[6px]'>

                  <div className='flex justify-center items-center p-[10px] bg-blue-400 rounded-full shadow-md hover:shadow-black border-[1px] border-blue-900'>
                    <svg class="md1:w-12 md1:h-12 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M4 19v2c0 .5523.44772 1 1 1h14c.5523 0 1-.4477 1-1v-2H4Z"/>
                      <path fill="currentColor" fill-rule="evenodd" d="M9 3c0-.55228.44772-1 1-1h8c.5523 0 1 .44772 1 1v3c0 .55228-.4477 1-1 1h-2v1h2c.5096 0 .9376.38314.9939.88957L19.8951 17H4.10498l.90116-8.11043C5.06241 8.38314 5.49047 8 6.00002 8H12V7h-2c-.55228 0-1-.44772-1-1V3Zm1.01 8H8.00002v2.01H10.01V11Zm.99 0h2.01v2.01H11V11Zm5.01 0H14v2.01h2.01V11Zm-8.00998 3H10.01v2.01H8.00002V14ZM13.01 14H11v2.01h2.01V14Zm.99 0h2.01v2.01H14V14ZM11 4h6v1h-6V4Z" clip-rule="evenodd"/>
                    </svg>
                  </div>

                  <h1 className='md1:text-[12px] text-[10px] font-bold text-black'>Withdraw</h1>

                </div>
              </NavLink>

              <NavLink to={'/aboutus'}>
                <div className='flex flex-col items-center gap-[6px]'>

                  <div className='flex justify-center items-center p-[10px] bg-blue-400 rounded-full shadow-md hover:shadow-black border-[1px] border-blue-900'>
                    <svg class="md1:w-12 md1:h-12 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V9a5 5 0 1 1 10 0v7.083A2.919 2.919 0 0 1 14.083 19H14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 1.732-1h.351a4.917 4.917 0 0 0 4.83-4H19a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.45 3.275a4 4 0 0 0-4.352.976 1 1 0 0 0 1.452 1.376 2.001 2.001 0 0 1 2.836-.067 1 1 0 1 0 1.386-1.442 4 4 0 0 0-1.321-.843Z" clip-rule="evenodd"/>
                    </svg>
                  </div>

                  <h1 className='md1:text-[12px] text-[10px] font-bold text-black'>Service</h1>

                </div>
              </NavLink>

              <a href="#products">
                <div className='flex flex-col items-center gap-[6px]'>

                  <div className='flex justify-center items-center p-[10px] bg-blue-400 rounded-full shadow-md hover:shadow-black border-[1px] border-blue-900'>
                    <svg class="md1:w-12 md1:h-12 w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                    </svg>
                  </div>

                  <h1 className='md1:text-[12px] text-[10px] font-bold text-black'>Plan</h1>

                </div>
              </a>

            </div>
          </div>

          <div className='flex justify-center items-center mt-[26px]'>
            <div className='lg1:w-[50%] md2:w-[70%] w-[90%] h-[14vh] bg-slate-100 rounded-full px-[8px] py-[6px] flex items-center justify-center border-[1px] border-black shadow-sm shadow-black'>

              <div className='flex flex-col items-center w-[50%] border-black border-r-[1px] border-dashed '>
                <h1 className='md3:text-[18px] sm2:text-[14px] text-[16px] text-blue-400 font-semibold'>₹{formatBalance(user.currentBalance)}</h1>
                <h1 className='md3:text-[12px] sm2:text-[10px] text-[9px]'>Total Income</h1>
              </div>

              <div className='flex flex-col items-center w-[50%] border-black border-r-[1px] border-dashed'>
                <h1 className='md3:text-[18px] sm2:text-[14px] text-[16px] text-blue-400 font-semibold'>₹{formatBalance(user.currentBalance)}</h1>
                <h1 className='md3:text-[12px] sm2:text-[10px] text-[9px]'>Withdrawable Balance</h1>
              </div>

              <div className='flex flex-col items-center w-[50%]'>
                <h1 className='md3:text-[18px] sm2:text-[14px] text-[16px] text-blue-400 font-semibold'>₹{formatBalance(user.rechargeBalance)}</h1>
                <h1 className='md3:text-[12px] sm2:text-[10px] text-[9px]'>Total Recharge</h1>
              </div>

            </div>
          </div>

          <div className='my-[26px] w-full flex flex-col items-center '>

            <div className='py-[6px] px-[28px] flex items-center justify-center border-2 border-blue-400 rounded-full bg-slate-100 shadow-xl my-[20px]'>
              <h1 className='font-bold sm3:text-[28px] text-[22px] m-0'>Products</h1>
            </div>

            <div id='products'  className='xl1:w-[70%] sm7:w-[80%] w-[90%] grid md4:grid-cols-2 grid-cols-1 xl1:flex flex-col items-center justify-center bg-slate-100 py-[36px] rounded-3xl border-[1px] border-slate-700 px-[20px] xl1:px-0 gap-[20px] xl1:gap-0'>


              {[...products]
                .filter(p => p.type !== 'fixed') // ✅ hide fixed plans
                .sort((a, b) => a.price - b.price) // ✅ sort by price ascending
                .map((product) => (
                <div key={product._id} className="Product xl1:w-[80%] w-full bg-zinc-100 xl1:flex items-center rounded-[10px] p-[2px] hover:shadow-2xl shadow-blue-200 transition duration-300 border-[1px] border-blue-400 my-[24px] relative">

                  <div className='absolute top-4 right-4 px-[20px] py-[4px] border-[1px] border-blue-400 rounded-full xl1:bg-transparent bg-white'>
                    <h1 className='text-[16px] font-bold m-0 '>{product.type}</h1>
                  </div>

                  <div className="img w-auto">
                    <img className='xl1:h-[130px] xl1:w-[300px] h-[200px] w-full xl1:rounded-tl-[10px] xl1:rounded-bl-[10px] rounded-tl-[10px] rounded-tr-[10px]' src="/images/product_img.jpg" alt="" />
                  </div>

                  <div className="cont xl1:ml-[28px] xl1:px-0 pt-[14px] xl1:pt-0 px-[20px] xl1:flex items-center w-full h-full xl1:mt-[30px]">

                    <div className={`xl1:w-[80%] w-[100%] h-[70%] flex justify-center text-blue-500`}>

                      <div className='flex flex-col gap-[0px] w-[50%] justify-center'>

                        <div className="nm">
                          <h1 className='xl1:text-[26px] sm3:text-[22px] text-[18px] font-bold'>{product.productName}</h1>
                        </div>

                        <div className="cycl flex mb-[4px] gap-[4px]">
                          <div>
                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>Income cycle:</h1>
                          </div>
                          <div>
                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>{product.duration}</h1>
                          </div>
                        </div>

                      </div>

                      <div className='flex flex-col justify-center items-end xl1:mr-[28px] w-[50%] gap-[10px]'>
                        
                        <div className="dlyincm flex gap-[6px]">
                          <div>
                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>Daily Income:</h1>
                          </div>
                          <div>
                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>₹{product.dailyIncome}</h1>
                          </div>
                        </div>

                        <div className="ttlrvn flex gap-[6px]">
                          <div>
                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>Total Revenue:</h1>
                          </div>
                          <div>
                            <h1 className='xl1:text-[15px] sm3:text-[12px] text-[12px] font-bold m-0'>₹{product.totalReturn}</h1>
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
                          <h1 className='text-[20px] font-bold'>₹{product.price}</h1>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className='my-[10px] px-[10px] mt-[20px] xl1:mt-0 xl1:my-0 xl1:px-0 flex justify-between items-center'>

                    <div className=' xl1:w-[20%] w-auto h-[65%] xl1:hidden block justify-center items-center xl1:border-l-2 xl1:border-l-blue-400 px-[10px] xl1:px-0'>

                        <div className="prc flex justify-center items-center">
                          <div>
                            <h1 className='text-[20px] font-bold'>₹{product.price}</h1>
                          </div>
                        </div>
                        
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProduct(product); // store the whole product
                        setShowConfirmModal(true);   // show modal
                      }}
                      className="px-4 py-2 mr-[8px] bg-blue-500 text-white rounded hover:bg-blue-600 transition xl1:mt-[30px]"
                    >
                      Buy
                    </button> 

                  </div>

                </div>
              ))}
                
              {/* <div className='Product w-[80%] bg-slate-100 flex items-center rounded-[10px] p-[2px] hover:shadow-2xl shadow-blue-200 transition duration-300 border-[1px] border-blue-400 my-[24px]'>

                <div className="img w-auto">
                  <img className='h-[130px] w-[300px] rounded-tl-[10px] rounded-bl-[10px]' src="/images/product_img.jpg" alt="" />
                </div>

                <div className="cont ml-[28px] flex items-center w-full h-full">

                  <div className='w-[80%] h-[70%] flex text-blue-800'>

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

              </div> */}

              {showConfirmModal && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
                    <h2 className="text-xl font-bold mb-4">Confirm Purchase</h2>
                    <p className="mb-2">Product: <strong>{selectedProduct.productName}</strong></p>
                    <p className="mb-2">Price: ₹{selectedProduct.price}</p>
                    <p className="mb-4">Daily Income: ₹{selectedProduct.dailyIncome}</p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setShowConfirmModal(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          await handleBuy(selectedProduct._id);
                          setShowConfirmModal(false);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
            </div>

          </div>

        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <Navbar/>

    </div>
  )
}

export default Home

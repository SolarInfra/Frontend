import React from 'react';
import { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Withdrawselect = () => {

  const navigate = useNavigate();

  const [customAmount, setCustomAmount] = useState('');

  const handleCustomAmountChange = (e) => {
  const val = e.target.value.replace(/^0+/, '');
  setCustomAmount(val);
};


  const handleWithdraw = async () => {
  if (!customAmount) {
    alert('Please enter an amount');
    return;
  }

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/withdrawcreate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({ amount: customAmount }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data);
      alert('Failed to submit withdraw');
    } else {
      alert('Withdraw request submitted!');
      navigate('/home');
    }
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className='bg-gradient-to-r from-blue-400 to-indigo-600 py-[100px] min-h-[100vh] font-poppins'>
        <div className='flex flex-col items-center justify-center'>

                <div className="sm7:w-[60%] w-[90%] mx-auto mt-14 p-11 bg-white rounded-2xl shadow-xl border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Withdraw Funds
                    </h2>

                    <h2 className="font-semibold mb-2 mt-4 text-[16px]">Enter Amount</h2>

                    <div className="flex items-center text-2xl font-bold mb-6 bg-white border px-6 py-2 rounded">
                        ₹
                        <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min="5000"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="0"
                        className="outline-none w-full ml-2 text-center"
                        />
                    </div>

                    {customAmount && Number(customAmount) >= 5000 ? (
                      <button
                        onClick={handleWithdraw}
                        className="w-full py-3 mt-2 rounded-xl bg-green-500 text-white font-semibold text-lg shadow-md hover:bg-green-600 transition"
                      >
                        Proceed
                      </button>
                    ) : customAmount ? (
                      <p className="text-red-600 text-center font-semibold">
                        Amount is less than the minimum withdraw amount (₹5000)
                      </p>
                    ) : null}


                    <div className='gap-[8px] my-[20px] mt-[80px]'>
                      <div className=" mt-[4px]">
                          <h1 className='sm4:text-[16px] sm7:text-[14px] text-[10px] font-bold m-0'>Notice:</h1>
                      </div>
                      <div className="flex items-center mt-[8px]">
                          <h1 className='sm4:text-[14px] sm7:text-[12px] text-[10px] m-0'>Withdraw requests will only be made from 10:00am to 6:00pm, requests made after that will be reviewed next day!</h1>
                      </div>
                      <div className="flex items-center mt-[8px]">
                          <h1 className='sm4:text-[14px] sm7:text-[12px] text-[10px] m-0'>All Withdraw request will be reviewed at 10:00pm to 11:00pm same day!</h1>
                      </div>
                  </div>
                </div>

                

        </div>
        <Navbar/>
    </div>
  )
}

export default Withdrawselect

import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

const Recharge = () => {
    const [amount, setAmount] = useState('');
    const [txnId, setTxnId] = useState('');
    const [upiId, setUpiId] = useState('');

    useEffect(() => {
    const fetchUpiId = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/get-upi`, {
        headers: {
            authtoken: localStorage.getItem('authToken'),
        },
        });

        const data = await res.json();
        setUpiId(data.upiId);
    };

    fetchUpiId();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/createrecharge`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authtoken': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ amount, txnId }),
        });

        const data = await res.json();
        alert(data.message);
    };

    const generateQRUrl = () => {
        const upiUrl = `upi://pay?pa=${upiId}&pn=YourName&am=${amount}&cu=INR`;
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
    };

  return (
    <div  className="bg-gradient-to-r from-blue-400 to-indigo-600 py-[30px] min-h-[100vh] flex justify-center items-start font-poppins pb-[100px]">
        <div className="xl1:w-[60%] w-[90%] flex flex-col items-center justify-center p-4 bg-gray-100 rounded-xl border-[1px] border-slate-700">

            <h1 className="text-[32px] font-bold mt-[20px] mb-[24px] text-center"> Recharge </h1>

            <div className="flex flex-col justify-center items-center gap-[20px] mt-[20px] sm8:w-[55%] w-[90%]">

                <form onSubmit={handleSubmit} className="p-6 border border-black rounded-2xl w-full max-w-md mx-auto my-[20px] ">
                    <h2 className="text-xl font-bold mb-4">Recharge Wallet</h2>
                    <input
                       type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min="5000"
                        required
                        value={amount || ''}
                        onChange={(e) => {
                        // Remove any leading zeros and make sure only digits are kept
                        const val = e.target.value.replace(/^0+/, '');
                        setAmount(val);
                        }}
                        placeholder="Enter amount"
                        className="text-[12px] font-semibold mb-2 bg-white border px-6 py-2 rounded text-center w-full"
                    />
                    <input
                        type="text"
                        placeholder="UPI Transaction ID"
                        className="border p-2 w-full mb-4"
                        value={txnId}
                        required
                        onChange={(e) => setTxnId(e.target.value)}
                    />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Recharge</button>
                </form>

                {/* {amount && (
                    <div className="flex flex-col items-center justify-center h-fit p-6 mb-[20px] bg-white rounded-lg shadow-md ">
                    <AnimatePresence>
                        {amount && (
                            <motion.div
                            key="qr-code"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center h-fit bg-white rounded-lg shadow-md"
                            >
                            <img
                                src={generateQRUrl()}
                                alt="UPI QR Code"
                                className="w-[200px] h-[200px]"
                            />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <h1></h1>

                    </div>
                )} */}

                {amount ? (
                    amount >= 5000 ? (
                        <div className="flex flex-col items-center justify-center h-fit p-6 mb-[20px] bg-white rounded-lg shadow-md ">
                        <AnimatePresence>
                            <motion.div
                            key="qr-code"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center h-fit bg-white rounded-lg shadow-md"
                            >
                            <img
                                src={generateQRUrl()}
                                alt="UPI QR Code"
                                className="w-[200px] h-[200px]"
                            />
                            </motion.div>
                        </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-red-600 font-bold mt-4">
                        Amount should be at least ₹1000.
                        </div>
                    )
                ) : null}

            </div>

            <div className='gap-[8px] my-[20px] mt-[50px]'>
                <div className=" mt-[4px]">
                    <h1 className='sm4:text-[16px] sm7:text-[14px] text-[10px] font-bold m-0'>Notice:</h1>
                </div>
                <div className="flex items-center mt-[8px]">
                    <h1 className='sm4:text-[14px] sm7:text-[12px] text-[10px] m-0'>1. Type the amount it should be more than 5000.</h1>
                </div>
                <div className="flex items-center mt-[8px]">
                    <h1 className='sm4:text-[14px] sm7:text-[12px] text-[10px] m-0'>2. Scan the Qr code (It will appear only if the amount if more than or equal to 5000).</h1>
                </div>
                <div className="flex items-center mt-[8px]">
                    <h1 className='sm4:text-[14px] sm7:text-[12px] text-[10px] m-0'>3. After successful payment copy the transaction ID and pate it above.</h1>
                </div>
                <div className="flex items-center mt-[8px]">
                    <h1 className='sm4:text-[14px] sm7:text-[12px] text-[10px] m-0'>4. Click Sumbit and your request will be submitted for review and your recharge will be added soon.</h1>
                </div>
            </div>

        </div>
        <Navbar/>
    </div>
  );
};

export default Recharge;

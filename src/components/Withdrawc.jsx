import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Withdrawc = () => {
    const [formData, setFormData] = useState({
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
    phonePNo: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const checkBankDetails = async () => {
            try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('authToken'),
                },
            });

            const data = await res.json();

            if (res.ok) {
                const { accHold, accNo, ifsc, phonepeNo } = data;

                if (accHold && accNo && ifsc && phonepeNo) {
                // ✅ If ALL exist → redirect
                navigate('/Withdraw');
                }

            } else {
                console.error(data.error || 'Failed to fetch user');
            }

            } catch (err) {
            console.error('Error fetching user:', err);
            }
        };

        checkBankDetails();
    }, [navigate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     // Ready for backend integration
    //     try {

    //         await new Promise((res) => setTimeout(res, 500));
    //         navigate('/Withdraw');
    
    //     // Reset the form
    //     setFormData({
    //         accountHolder: '',
    //         accountNumber: '',
    //         ifscCode: ''
    //     });
    //     } catch (error) {
    //     console.error('Error submitting bank details:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/updatebank`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('authToken'),
            },
            body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
            console.error(data);
            alert(data.error || 'Something went wrong');
            } else {
            alert('Bank details submitted!');
            navigate('/Withdraw');

            setFormData({
                accountHolder: '',
                accountNumber: '',
                ifscCode: '',
                phonePNo: ''
            });
            }
        } catch (err) {
            console.error('Error submitting bank details:', err);
        }
        };

  return (
    <div className='bg-gradient-to-r from-blue-400 to-indigo-600 py-[100px] min-h-[100vh] font-poppins'>
      <div className='flex flex-col items-center justify-center'>
        <div className='md6:w-[40%] sm7:w-[60%] w-[90%]'>
            <form
                onSubmit={handleSubmit}
                className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg shadow-black border-[1px] border-zinc-400"
                >

                <h2 className="text-xl font-bold mb-4 text-center">Bank Account Details</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="accountHolder">
                    Account Holder Name
                    </label>
                    <input
                    type="text"
                    name="accountHolder"
                    id="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="accountNumber">
                    Account Number
                    </label>
                    <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="ifscCode">
                    IFSC Code
                    </label>
                    <input
                    type="text"
                    name="ifscCode"
                    id="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="ifscCode">
                    PhonePe or Google Pay or any other number
                    </label>
                    <input
                    type="text"
                    name="phonePNo"
                    id="phonePNo"
                    value={formData.phonePNo}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 uppercase"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Submit
                </button>

            </form>
        </div>

      </div>
      <Navbar/>
    </div>
  )
}

export default Withdrawc

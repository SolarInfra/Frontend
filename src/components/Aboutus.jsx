import React from 'react';
import Navbar from './Navbar';

const Aboutus = () => {
  return (
    <div className='bg-gradient-to-r from-blue-400 to-indigo-600 py-[100px] min-h-[100vh] font-poppins'>
      <div className='flex flex-col items-center justify-center'>
        <div className='lg3:w-[60%] sm6:w-[80%] w-[90%] bg-white py-[36px] rounded-xl border-[1px] border-slate-700 flex flex-col items-center relative'>
          <div>
            <h1 className='sm4:text-[34px] sm6:text-[30px] text-[26px] font-bold text-black'>Need Help?</h1>
          </div>   

          <div className='w-[40%] h-[2px] mb-[20px] bg-blue-400 absolute top-[20%]'></div>    

            {/* <div className='md7:w-[60%] w-[80%] bg-slate-100 border-[1px] border-blue-400 rounded-lg mt-[60px] my-[16px] p-[20px] flex items-center justify-center gap-[12px] hover:shadow-2xl shadow-black transition duration-300'>
              <div className='flex items-center'>
                <img src="/icons/whatsapp.svg" className='w-[32px]' alt="" />
              </div>
              <div className='flex items-center'>
                <h1 className='sm4:text-[18px] sm6:text-[14px] text-[12px] font-semibold m-0'>Join our Whatsapp group</h1>
              </div>
            </div> */}

            <a 
              href="https://chat.whatsapp.com/KogrJANULObIJ9AAsUShaz?mode=r_c" 
              target="_blank" 
              rel="noopener noreferrer"
              className='md7:w-[60%] w-[80%] bg-slate-100 border-[1px] border-blue-400 rounded-lg mt-[60px] my-[16px] p-[20px] flex items-center justify-center gap-[12px] hover:shadow-2xl shadow-black transition duration-300 no-underline text-black'
            >
              <div className='flex items-center'>
                <img src="/icons/whatsapp.svg" className='w-[32px]' alt="" />
              </div>
              <div className='flex items-center'>
                <h1 className='sm4:text-[18px] sm6:text-[14px] text-[12px] font-semibold m-0'>Join our Whatsapp group</h1>
              </div>
            </a>
          
            <a 
              href="https://t.me/solarinfracorps" 
              target="_blank" 
              rel="noopener noreferrer"
              className='md7:w-[60%] w-[80%] bg-slate-100 border-[1px] border-blue-400 rounded-lg my-[8px] p-[20px] flex items-center justify-center gap-[12px] hover:shadow-2xl shadow-black transition duration-300 no-underline text-black'
            >
              <div className='flex items-center'>
                <img src="/icons/telegram.svg" className='w-[28px]' alt="" />
              </div>
              <div className='flex items-center'>
                <h1 className='sm4:text-[18px] sm6:text-[14px] text-[12px] font-semibold m-0'>Join our Telegram group</h1>
              </div>
            </a>

            <a 
              href="https://t.me/si1QndFd0IU3YWE1" 
              target="_blank" 
              rel="noopener noreferrer"
              className='md7:w-[60%] w-[80%] bg-slate-100 border-[1px] border-blue-400 rounded-lg my-[8px] p-[20px] flex items-center justify-center gap-[12px] hover:shadow-2xl shadow-black transition duration-300 no-underline text-black'
            >
              <div className='flex items-center'>
                <img src="/icons/telegram.svg" className='w-[28px]' alt="" />
              </div>
              <div className='flex items-center'>
                <h1 className='sm4:text-[18px] sm6:text-[14px] text-[12px] font-semibold m-0'>Chat with us on Telegram</h1>
              </div>
            </a>



          <div className='flex items-center gap-[8px] mt-[30px]'>
            <div>
              <h1 className='sm4:text-[16px] sm7:text-[14px] text-[10px] font-bold'>Notice:</h1>
            </div>
            <div>
              <h1 className='sm4:text-[16px] sm7:text-[14px] text-[10px]'>Please text us and wait for atleast 10 minutes!</h1>
            </div>
          </div>

        </div>
      </div>
      <Navbar/>
    </div>
  )
}

export default Aboutus

import React from 'react'
import logo from '../assets/logos/logo1.png'


function SideBar() {
    const items = [
    {name:"DashBoard", path:'/'},
    {name:"Users", path:'/'},
    {name:"storage", path:'/'}
]

    return (
        <div className='w-[25%] h-screen bg-white flex flex-col items-center justify-start  p-1'>
            {/* logo section */}
            <div className='w-full h-[10%]  flex bg-gray-200 flex-row items-center justify-start shadow-xl  rounded-xl'>
                <img src={logo} alt="logo" className='w-[80px]' />
                {/* logo text */}
                <div className='flex flex-col items-start  justify-center p-2'>
                    <h1 className=' font-azonix text-lg'>Admin </h1>
                    <span className='font-montsterat font-bold text-xs'>Iot Dashboard</span>
                </div>
            </div>

          {/* menu */}
            <div className='w-full flex flex-col items-start justify-start pt-2'>
                {items.map((item, index) => (
                    <button
                      key={index}
                    >
                        <img src='' alt="" />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SideBar

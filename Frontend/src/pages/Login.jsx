import React from 'react'
import Input_field1 from '../components/Input_field1'
import LoginBtn from '../components/LoginBtn'
import logo1 from '../assets/logos/logo1.png'

function Login() {
  return (
    <div className='flex-col w-screen min-h-screen bg-gradient-to-bl from-[#EEEEEE] to-[#91ADC8] flex items-center justify-start'>
        {/* logo panel */}
        <div className='w-[30%] md:w-[12%] self-start'>
            <img src={logo1} alt="logo" className='p-4 pb-6 pt-2' />
        </div>

        {/* display card panel */}
        <div className='w-[95%] md:w-[35%] md:h-[50vh] bg-[#96B6C5] border border-white-300 rounded rounded-xl flex-col flex items-center justify-start shadow-xl pb-6 md:pb-0'>
          {/* user text */}
          <div className='pt-4 flex flex-col items-center justify-center'>
            <h1 className='text-xl md:text-3xl font-bold font-azonix'>User Login</h1>
            <span className='text-xs font-montsterat font-bold'>welcome back user</span>
          </div>

          {/* Login input field */}
          <div className='w-full flex flex-col items-center justify-center m-2'>
            <Input_field1 label='Username' type='text' placeholder='username' />
            <Input_field1 label='Password' type='password' placeholder='password' />
          </div>
             <LoginBtn label='login' />
             <div className='w-full md:w-[80%] flex m-2 items-center justify-between'>
              <h3 className='font-montsterat text-xs font-bold self-start md:ml-9 m-4'>New here ? <button className='text-blue-900 font-bold hover:text-purple-900' >create account</button></h3>
              <h3 className='font-montsterat text-xs font-bold self-start md:ml-9 m-4'><button className='text-blue-900 font-bold hover:text-purple-900' >Forgot password ?</button></h3>
             </div>
        </div>
    </div>
  )
}

export default Login

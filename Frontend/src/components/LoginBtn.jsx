import React from 'react'

function LoginBtn({label = "login"}) {
  return (
    <button className='w-[40%] bg-[#CBCBCB] rounded-xl flex items-center justify-center m-1 hover:rounded-md'>
        <h1 className='m-1 font-azonix '>{label}</h1>
    </button>
  )
}

export default LoginBtn

import React from 'react'

function Input_field1({type = "text", label = "Username", placeholder="username"}) {
  return (
    <div className='flex flex-col w-[80%] md:w-[70%] items-center justify-center rounded rounded-xl m-3'>
      <span className='flex self-start font-azonix text-xs'>{label}</span>
      <input type={type}
       placeholder={placeholder}
       className='w-full rounded-full p-1 shadow-sm font-montsterat font-bold text-xh hover:rounded-md'
       />
    </div>
  )
}

export default Input_field1

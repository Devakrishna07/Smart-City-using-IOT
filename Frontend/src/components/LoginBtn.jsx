import React from 'react';

function LoginBtn({ label = "Login", onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-[40%] bg-[#CBCBCB] rounded-xl flex items-center justify-center m-1 hover:rounded-md transition-all duration-200"
    >
      <h1 className="m-1 font-azonix">{label}</h1>
    </button>
  );
}

export default LoginBtn;

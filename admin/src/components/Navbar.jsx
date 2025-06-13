import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const { aToken,setAToken } = useContext(AdminContext);

  const navigate =useNavigate;

  const logout = ()=>{
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="h-10 w-auto object-contain"
        />
        <p className="text-lg rounded-full border-2 px-2.5 py-0.5 font-semibold text-gray-600">
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-200">
        Logout
      </button>
    </div>
  );
};

export default Navbar;

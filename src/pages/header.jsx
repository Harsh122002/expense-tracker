import React, { useContext } from 'react';
import AuthContext from '../context/auth';
import {  useNavigate } from 'react-router';

export default function Header() {
     const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleDelete = () => {
    logout();
    navigate('/login');
  };
  return (
     <header className="w-full px-8 bg-gray-900 flex flex-row justify-between py-6 text-white text-center">
     <h1 className="text-3xl font-semibold">Expense Tracker</h1>
     {isAuthenticated && (
       <button onClick={handleDelete} className='p-2 bg-red-600 border-2 border-red-600 rounded-md hover:text-red-600 hover:bg-white duration-300 ease-in-out cursor-pointer'>Logout</button>
     )}
   </header>  )
}

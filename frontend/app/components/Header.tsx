"use client"

import React, { useState } from 'react';
import Favourites from './Favourites';
import Link from 'next/link';
import { Person, Menu, Facebook, Twitter, Instagram, X } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import { LogOut, FileVideo2 } from 'lucide-react';

export default function Header() {
  const { logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(true);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`px-4 lg:px-[7rem] z-10 top-0 flex fixed mb-4 w-full justify-between items-center p-4 bg-[#093545] shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'h-[50vh]' : ''}`}>
      <h1 className="text-2xl font-extrabold text-white transition-colors duration-300 ease-in-out">
        <Link href='/'>
          My-Movie-Shelf
        </Link>
      </h1>
      
      <button onClick={()=> toggleMenu()} className="lg:hidden p-2 focus:outline-none text-white">
        <Menu className="text-white" />
      </button>

      <div 
        className={`flex lg:items-center lg:flex-row flex-col space-y-2 lg:justify-end lg:space-x-4 
          ${isMenuOpen ? 'fixed inset-0 bg-[#092C39] p-4 transition-transform duration-300 ease-out transform translate-x-0' : 'fixed -translate-x-full ml-[-4rem] transition-transform duration-300 ease-in'} 
          lg:translate-x-0 lg:relative lg:bg-transparent lg:p-0 lg:flex lg:flex-row`}>
        
        <div onClick={()=> closeMenu()} className="lg:hidden z-20 text-white fixed top-4 right-4 p-2 focus:outline-none transition-colors duration-300 ease-in-out transform hover:scale-105">
        <button>
          ✕
        </button>
        </div>

        <div className='flex gap-10 lg:flex-row flex-col'>
        <Favourites />

        <div className="flex items-center space-y-2 lg:flex-row text-white lg:space-y-0 lg:space-x-4">
            <Link href="/movies" className='hover:cursor-pointer transition-colors flex gap-4 duration-300 ease-in-out transform hover:scale-105'>All Movies <FileVideo2 className='text-white'/></Link>
          </div>

          <div className="flex items-center space-y-2 lg:flex-row text-white lg:space-y-0 lg:space-x-4">
            <Link href="/" onClick={()=> logout()} className='hover:cursor-pointer transition-colors flex gap-4 duration-300 ease-in-out transform hover:scale-105'>Logout <LogOut className='text-white'/></Link>
          </div>
          </div>
      </div>
    </header>
  );
}

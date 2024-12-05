"use client"

import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Cart from './Favourites';
import Link from 'next/link';
import { Person, Menu, Facebook, Twitter, Instagram, X } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`px-4 lg:px-[7rem] z-10 top-0 flex fixed mb-4 w-full justify-between items-center p-4 bg-[#093545] shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'h-[50vh]' : ''}`}>
      <h1 className="text-2xl font-extrabold text-white transition-colors duration-300 ease-in-out">
        <Link href='/'>
          My-Movie-Shelf
        </Link>
      </h1>
      
      <button onClick={toggleMenu} className="lg:hidden p-2 focus:outline-none">
        <Menu className="text-gray-800 dark:text-white" />
      </button>

      <div 
        className={`flex lg:items-center lg:flex-row flex-col space-y-2 lg:justify-end lg:space-x-4 
          ${isMenuOpen ? 'fixed inset-0 bg-white dark:bg-gray-700 p-4 transition-transform duration-300 ease-out transform translate-x-0' : 'fixed -translate-x-full ml-[-4rem] transition-transform duration-300 ease-in'} 
          lg:translate-x-0 lg:relative lg:bg-transparent lg:p-0 lg:flex lg:flex-row`}>
        
        <button 
          onClick={toggleMenu} 
          className="lg:hidden absolute top-4 right-4 text-gray-800 dark:text-white p-2 focus:outline-none"
        >
          ✕
        </button>

        {/* <ThemeToggle /> */}
        <Cart />

        {!isAuthenticated ? (
          <div className="flex items-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">
            <Link href="/signin">
            <Button title={'Login'} />
            </Link>
              <Button onClick={function (): void {
              throw new Error('Function not implemented.');
            } } title={'Click'} />
          </div>
        ) : (
          <div className="relative mt-4 lg:mt-0">
            <button onClick={toggleDropdown} className="flex items-center border space-x-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <Person className="text-gray-800 dark:text-white" />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-20 right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    logout(); 
                    setIsDropdownOpen(false);
                    closeMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Social Media Links for Mobile View */}
        {isMenuOpen && (
          <div className="flex flex-col items-center gap-6 mt-4 lg:hidden text-gray-800 dark:text-white">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
              Facebook <Facebook  />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
              X(formerly twitter)<X  />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
              Instagram <Instagram  />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

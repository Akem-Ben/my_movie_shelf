"use client"

import React from 'react';
import './globals.css';
import Header from './components/Header';
import { FavouritesProvider } from './context/FavouritesContext';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import Footer from './components/Footer';
import { AlertProvider } from "next-alert";
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isRootPage = pathname === '/';
  const isLoginPage = pathname === '/signin';
  const isSignUp = pathname === '/signup'
  const isMoviesPage = pathname === '/movies'

  return (
    <html lang="en">
      <body className="bg-[#093545] font-montserrat">
        <AuthProvider>
          <MovieProvider>
          <AlertProvider>
            <FavouritesProvider>
            <div className={`${!isRootPage && !isLoginPage && !isSignUp && !isMoviesPage && 'pt-[6rem]'} `}>
              {!isRootPage && !isLoginPage && !isSignUp && !isMoviesPage && <Header />}
              <main className='inconsolata'>
                {children}
              </main>
              {!isRootPage && <Footer />}
              </div>
            </FavouritesProvider>
          </AlertProvider>
          </MovieProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
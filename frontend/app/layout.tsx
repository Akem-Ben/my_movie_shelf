"use client"

import React from 'react';
import './globals.css';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import { AlertProvider } from "next-alert";
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isRootPage = pathname === '/';

  return (
    <html lang="en">
      <body className="bg-[#093545]">
        <AuthProvider>
          <AlertProvider>
            <CartProvider>
            <div className={`${!isRootPage && 'pt-[6rem]'} `}>
              {!isRootPage && <Header />}
              <main className='inconsolata'>
                {children}
              </main>
              {!isRootPage && <Footer />}
              </div>
            </CartProvider>
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
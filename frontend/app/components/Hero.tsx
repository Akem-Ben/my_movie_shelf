"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import heroImg from '../../public/landingPage/movie.jpeg';

const Hero: React.FC = () => {
  return (
    <section className="flex items-center justify-center w-full lg:h-[100vh] h-[100vh] overflow-hidden bg-gray-800">
      <div className="absolute inset-0">
        <Image
          src={heroImg}
          alt="Hero Background"
          fill
          className="opacity-40 object-cover"
        />
      </div>

      <div className="relative z-10 text-center text-white">
        <motion.h1
          className="text-4xl md:text-7xl sm:text-4xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to My-Movie-Shelf
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your one-stop shelf for your movies
        </motion.p>

        <div className="mt-6 flex flex-col gap-4 sm:gap-2 sm:flex-row justify-center space-x-4">
        <motion.a
    href="/signup"
    className="flex-1 px-6 py-3 text-lg font-semibold text-white bg-[#2BD17E] rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:border hover:rounded-lg hover:bg-transparent hover:scale-105"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    Signup
  </motion.a>
  <motion.a
    href="/signin"
    className="flex-1 px-6 py-3 text-lg font-semibold border border-white rounded-lg transition duration-300 ease-in-out transform hover:bg-[#2BD17E] hover:text-white hover:scale-105"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
  >
    Login
  </motion.a>
  <motion.a
    href="/movies"
    className="flex-1 px-6 py-3 text-lg font-semibold text-white bg-[#2BD17E] rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:border hover:rounded-lg hover:bg-transparent hover:scale-105"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.8 }}
  >
    View Movies
  </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

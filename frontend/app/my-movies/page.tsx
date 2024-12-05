"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Skeleton, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
// import './globals.css';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";
import InputField from '../components/Input';
import MovieCard from '../components/MovieCard';

const ITEMS_PER_PAGE = 6;

const MyMovies = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const { addToCart } = useCart(); 
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { addAlert } = useAlert();
  
    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory]);
  
    const handleAddToCart = (product: any) => {
      addToCart(product); 
      addAlert("Product added to cart successfully", "Proceed to checkout", "success");
    };
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1); 
    };
  
    const handleCategoryChange = (event: React.ChangeEvent<{ value: string }> | any) => {
      setSelectedCategory(event.target.value as string);
      setCurrentPage(1); 
    };
  
    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const displayedProducts = filteredProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

return (
    <>
      <div className="p-4 lg:px-[7rem]">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <InputField label={'Search Movies'} />

<FormControl variant="outlined" className="w-full sm:w-1/4 ml-2 text-white">
    <>
      <InputLabel className="text-white">Filter Movies by Genre</InputLabel>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        label="Category"
        style={{
          backgroundColor: '#224957',
          color: 'white',
          borderColor: '#224957',
        }}
        MenuProps={{
          PaperProps: {
            style: {
              color: '#224957',
            },
          },
        }}
      >
        <MenuItem value="">
          <em className='text-gray-400'>All</em>
        </MenuItem>
        <MenuItem value="action">Action</MenuItem>
        <MenuItem value="romance">Romance</MenuItem>
        <MenuItem value="sci-fi">Sci-Fi</MenuItem>
        <MenuItem value="thriller">Thriller</MenuItem>
        <MenuItem value="drama">Drama</MenuItem>
        <MenuItem value="k-drama">K-Drama</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </Select>
    </>
</FormControl>


        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Skeleton 
                key={index} 
                variant="rectangular" 
                width="100%" 
                height={250} 
                animation="pulse" 
                className="mb-4 rounded-lg" 
                style={{
                  backgroundColor: 'rgba(200, 200, 200, 0.2)',
                  borderRadius: '10px',
                  transform: 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
            ))
          ) : displayedProducts.length === 0 ? (
            <p className='text-lg text-grey-400 h-[50vh] m-auto'>No products found</p>
          ) : (
            displayedProducts.map((product) => (
              <div key={product.id} className="">
                <MovieCard imageSrc={product.imageUrl} title={product.title} date={product.title} owner={true} />
              </div>
            ))
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-10 my-10">
            <Button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              className="mr-2"
            >
              <ArrowLeft/>
              Previous
            </Button>
            <Button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
              <ArrowRight/>
            </Button>
          </div>
        )}
      </div>
      <Alerts
        position="top-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      >
      </Alerts>

</>
      )
      }


export default MyMovies
import React from 'react'
import { Link } from 'react-router-dom';
import { IoLocationOutline, IoCartOutline, IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAppStore } from "react-icons/fa";

function Navbar() {
    return (
        <nav className='text-white p-3 bg-gray-800 h-14 flex items-center justify-between'>
            <h2 className="uppercase text-white font-bold text-xl">cashew<span className='text-red-500'>cart</span></h2>
            <div className="hidden lg:flex items-center ">
                <button className='px-4 bg-red-500 text-white p-2 rounded-l'>Filter</button>
                <input type="text" className='p-2 w-96 outline-none rounded-r' placeholder='Search Products....' name="" id="" />
            </div>
            {/* btn for login and register */}
            <Link to="/">
                <button className='p-2 text-white  font-bold px-4 bg-red-500 '>Login / Register</button>
            </Link>

            {/* icons */}
            <div className='hidden lg:flex items-center gap-x-3'>
                <Link to="/" className='flex flex-col items-center'>
                    <IoLocationOutline className='text-2xl bg-white p-1 rounded-full text-gray-800' />
                    <span className='text-sm font-semibold'>Track</span>
                </Link>
                <Link to="/" className='flex flex-col items-center'>
                    <IoCartOutline className='text-2xl bg-white p-1 rounded-full text-gray-800' />
                    <span className='text-sm font-semibold'>Cart</span>
                </Link>
            </div>

            {/* playstrore and app store */}
            <div className='hidden lg:flex flex-col items-center'>
                <div className='flex items-center'>
                    <a href="" className='p-1 text-2xl'><FaAppStore /></a>
                    <a href="" className='p-1 text-2xl'><IoLogoGooglePlaystore /></a>
                </div>
                <span className='text-sm font-bold'>Download the App</span>
            </div>

        </nav>
    )
}

export default Navbar
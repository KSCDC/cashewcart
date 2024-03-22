import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLocationOutline, IoCartOutline, IoClose, IoHomeOutline } from "react-icons/io5";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from '../Hooks/AuthContext';
import useAuthStatus from '../Hooks/useAuthStatus';

import { FaUserLarge } from "react-icons/fa6";
function Navbar() {



  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useAuthStatus()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prioritize essential mobile navigation links (replace with yours)
  const mobileNavLinks = [
    { title: 'Home', path: '/' },
    { title: 'Track', path: '/track' },
    { title: 'Cart', path: '/cart' },
  ];

  const mobileNavContent = mobileNavLinks.map((link) => (
    <Link key={link.path} to={link.path} className='text-xl px-4 py-2 flex items-center hover:bg-gray-700 rounded-lg'>
      <span className='mr-2'>{link.title}</span>
      {/* Optional icon (uncomment if desired) */}
      {/* <IoLocationOutline className='text-xl' /> */}
    </Link>
  ));


  // Simplified Login/Logout button (adapt to your use case)
  const ButtonBasedOnLoginStatus = (
    <Link to={isLoggedIn ? "/profile" : "/login"}>
      <button className='px-4 py-2 bg-red-500 text-white rounded-lg font-bold'>
        {isLoggedIn ? "Profile" : "Login"}
      </button>
    </Link>
  );

  function LogOut(){
    localStorage.clear()
    window.location.reload()
  }
 
  const DropDownMenu = () => {
    return (
      isLoggedIn ? (
        <>
          
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><button onClick={LogOut}>Logout</button></li>
       
        </>
      ) : <>
      <li>
      <Link className='btn bg-red-500 text-white' to="/login">Login</Link>  </li>   
            </>
    );
  }
  
  const mobileNavbarClasses = `
    fixed z-50 top-0 left-0 w-full bg-gray-800 text-white py-4 px-6 flex flex-col items-center gap-4
    ${isMenuOpen ? 'justify-center' : 'hidden'}
  `;

  return (
    <>
      <nav className='hidden lg:flex items-center justify-between bg-gray-800 text-white py-4 px-6 lg:px-12'>
        {/* Desktop navigation (your existing code) */}
        <Link to={"/"} className="text-2xl font-bold flex items-center uppercase">
          <span className="mr-1">cashew</span>
          <span className='text-red-500'>cart</span>
        </Link>
        {/* Hamburger menu for mobile */}
        <div className='lg:hidden '>
          <button onClick={toggleMenu} className='p-2'>
            {isMenuOpen ?
              <FaTimes className='text-xl' /> :
              <FaBars className='text-xl' />}
          </button>
        </div>
        {/* Navigation links */}
        <div className={`lg:flex items-center gap-x-6 ${isMenuOpen ? 'flex flex-col lg:flex-row' : 'hidden'}`}>
          <Link to="/" className='flex items-center'>
            <IoHomeOutline className='text-xl mr-1' />
            <span className='text-xl hover:text-red-500 font-semibold'>Home</span>
          </Link>
          <Link to="/" className='flex items-center'>
            <IoLocationOutline className='text-xl mr-1' />
            <span className='text-xl hover:text-red-500 font-semibold'>Track</span>
          </Link>
          <Link to="/cart" className='flex items-center space-x-3'>
          {isLoggedIn ? (
            <div className="indicator ">
            <FaShoppingCart className='text-xl'/>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          ) : (
            <FaShoppingCart className='text-xl'/>
          )}
        <span className='text-xl hover:text-red-500 font-semibold'>Cart</span>
          </Link>
        </div>
        {/* Buttons and download links */}
        <div className='hidden lg:flex items-center gap-2'>
          {/* Download links */}
          <div className='flex items-center gap-3'>
            <a href="" className='p-1'>
              <img src="/logo/appstore.png" className='h-8' alt="App Store" />
            </a>
            <a href="" className='p-1'>
              <img src="/logo/playstore.png" className='h-8' alt="Plasy store image" />
            </a>
          </div>
          {/* Login/Logout button */}
          {/* {ButtonBasedOnLoginStatus} */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="text-xl ">
                <FaUserLarge/>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
            <DropDownMenu/>
            </ul>
          </div>
        </div>
      </nav>
      <div className='lg:hidden'>
        <button onClick={toggleMenu} className='text-xl mr-4 focus:outline-none'>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={mobileNavbarClasses}>
          {/* {mobileNavContent} */}
          <div className={`lg:flex items-center gap-6 ${isMenuOpen ? 'flex flex-col lg:flex-row' : 'hidden'}`}>
            <Link to="/" className='flex items-center'>
              <IoHomeOutline className='text-xl mr-1' />
              <span className='font-semibold text-xl'>Home</span>
            </Link>
            <Link to="/" className='flex items-center'>
              <IoLocationOutline className='text-xl mr-1' />
              <span className='font-semibold text-xl'>Track</span>
            </Link>
            <Link to="/" className='flex items-center'>
              <IoCartOutline className='text-xl mr-1' />
              <span className='text-xl font-semibold'>Cart</span>
            </Link>
          </div>
          <div className='flex items-center gap-3 mt-4'>
            <a href="https://www.apple.com/app-store/" className='p-1'>
              <img src="/logo/appstore.png" className='h-10' alt="App Store" />
            </a>
            <a href="https://play.google.com/store" className='p-1'>
              <img src="/logo/playstore.png" className='h-10' alt="Play Store" />
            </a>
          </div>
          {ButtonBasedOnLoginStatus}
          <button onClick={toggleMenu} className="text-2xl text-white rounded-lg">
            <IoClose />
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;

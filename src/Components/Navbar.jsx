import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLocationOutline, IoCartOutline, IoClose, IoHomeOutline } from "react-icons/io5";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import useAuthStatus from '../Hooks/useAuthStatus';
import { RiSearchLine } from 'react-icons/ri';
import { FaUserLarge } from "react-icons/fa6";
import { BACKEND_URL } from '../constants';

function Navbar({setShowModal}) {
  const [cartLength, setCartLength] = useState(0);
  const [error, setError] = useState('')
  const navigate = useNavigate()

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

  function LogOut() {
    localStorage.clear()
    window.location.reload()
  }

  const DropDownMenu = () => {
    return (
      isLoggedIn ? (
        <>
          <li><Link to="/profile" className="justify-between">Profile</Link></li>
          <li><a>Track Order</a></li>
          <li><button onClick={LogOut}>Logout</button></li>
        </>
      ) : (
        <li>
          <Link className='btn bg-red-500 text-white' to="/login">Login</Link>
        </li>
      )
    );
  }

  // Fetch cart length
  async function fetchCartLength() {
    const access_token = localStorage.getItem("access_token")
    try {
      const response = await fetch(`${BACKEND_URL}/api/product/cart/list/`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${access_token}` }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart products");
      }
      const data = await response.json();
      setCartLength(data.count);
    } catch (error) {
      // setError("Failed to fetch cart products. Please try again later.");
      // console.error(error);
      // setTimeout(() => {
      //     navigate("/login")
      // }, 2000)
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      fetchCartLength()
    }
  }, [])

  return (
    <>
      {/* desktop view of the navbar */}
      <nav className='hidden lg:flex items-center justify-between bg-white bg:blur backdrop-blur-md py-4 px-6 lg:px-12 sticky z-50 top-0 shadow-xl'>
        {/* Desktop navigation  */}
        <div className='flex items-center gap-x-12'>
          <Link to={"/"} className="text-2xl font-bold  flex items-center uppercase">
            <h2 className='ml-8'>
              <span className="">cashew</span>
              <span className='text-red-500'>cart</span>
            </h2>
          </Link>
          {/* search bar */}
          <button onClick={() => setShowModal(true)} className="relative">
      <input
        type="text"
        placeholder="Search Products"
        className="input w-96 bg-gray-100 disabled pl-10"
      />
      <RiSearchLine className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
    </button>
        </div>

        {/* Hamburger menu for mobile */}
        <div className='lg:hidden'>
          <button onClick={toggleMenu} className='p-2'>
            {isMenuOpen ?
              <FaTimes className='text-xl' /> :
              <FaBars className='text-xl' />}
          </button>
        </div>
        {/* Navigation links */}
        <div className={`lg:flex items-center gap-x-6 ${isMenuOpen ? 'flex flex-col lg:flex-row' : 'hidden'}`}>
          <Link to="/" className='flex items-center text-red-500 hover:underline'>
            <IoHomeOutline className='text-xl mr-1' />
            <span className='text-xl  font-medium'>Home</span>
          </Link>

          <Link to="/cart" className='flex items-center space-x-3 text-red-500 hover:underline'>
            {isLoggedIn ? (
              <div className="indicator ">
                <IoCartOutline className='text-xl' />
                <span className="badge badge-sm indicator-item bg-red-500 text-white font-bold">{cartLength}</span>
              </div>
            ) : (
              <IoCartOutline className='text-xl' />
            )}
            <span className='text-xl  font-medium'>Cart</span>
          </Link>
        </div>
        {/* Buttons and download links play store & app store */}
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
                <FaUserLarge />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
              <DropDownMenu />
            </ul>
          </div>

          {/* menu button */}
          <div className="dropdown dropdown-end absolute right-0">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="text-xl ">
                <CiMenuKebab />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
              <li><a href="#" className=' items-center hidden'>Connect</a></li>
              <li><a href="#" className='hidden items-center'>Connect</a></li>
            </ul>
          </div>
        </div>
      </nav>
      {/* mobile view of the navbar */}
      <div className='lg:hidden absolute left-2 top-2'>
        <button onClick={toggleMenu} className='text-xl mr-4 focus:outline-none'>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={isMenuOpen ? 'fixed inset-0 overflow-hidden bg-black bg-opacity-60 z-50' : 'hidden'}>
          <div className='absolute top-0 left-0 bg-white h-full w-64 shadow-xl z-50 transform transition-transform duration-300 ease-in-out'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
              <h2 className='text-xl font-bold'>
                <span className=''>cashew</span>
                <span className='text-red-500'>cart</span>
              </h2>
              <button onClick={toggleMenu} className="text-2xl text-gray-500">
                <IoClose />
              </button>
            </div>
            <div className='p-4'>
              <div className='flex flex-col gap-y-4'>
                {mobileNavContent}
              </div>
              <div className='flex justify-center mt-6 w-'>
              <Link to={isLoggedIn ? "/profile" : "/login"}>
      <button className='btn w-full bg-red-500 text-white rounded-lg font-bold'>
        {isLoggedIn ? "Profile" : "Login"}
      </button>
    </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;


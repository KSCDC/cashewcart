import React from 'react';
import { MdOutlineShoppingCart,MdOutlineStar } from "react-icons/md";

import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../constants';
function ProductCard({name,image,id,description }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <img className="h-80 w-full object-contain" src={`${BACKEND_URL}${image}`} alt={`${BACKEND_URL}${image}`} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        {/* <p className="text-gray-700">{description.slice(0, 50)}...</p> */}
       <div className="flex justify-between items-center">
       {/* <div className='flex items-center'>
        <h2 className='font-bold'>Rating: </h2>
       {Array.from({length: rating}).map((_,index) => (
          <MdOutlineStar key={index} className='text-yellow-400 text-xl'/>
        ))}
       </div> */}

       <Link to={"/purchase"} state={{id: id}}>
       <button className='btn text-white bg-red-500 hover:bg-red-600'>
        <MdOutlineShoppingCart/>View More
        </button>
       </Link>
       </div>
      </div>
    </div>
  );
}

export default ProductCard;

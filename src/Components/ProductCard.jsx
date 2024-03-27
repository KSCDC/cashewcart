import React, { Suspense } from 'react';
import { BACKEND_URL } from '../constants';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { IoStarSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
function ProductCard({ product, selling_price }) {
  return (
    <Suspense fallback={<Loading/>}>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img
        className="w-full h-72 object-contain"
        src={`${BACKEND_URL}${product.product_images[0].product_image}`}
        alt="Product Primary Image"
      />
      <div className="p-6">
        <h3 className="text-gray-900 font-semibold text-xl mb-2">{product.name}</h3>
        <p className="text-gray-700 text-base mb-4">{product.description.slice(0, 72)}...</p>
        {/* <p className="text-red-500 text-xl font-semibold">₹{selling_price}</p> */}
     
       <div className="flex items-center justify-between">
        {/* product rating */}
       <div className="flex items-center text-yellow-400">
       {Array.from({length:product.average_rating}).map((_,index) => (
          <IoStarSharp key={index} className='text-lg'/>
        ))}
        <span className='text-black'>({product.average_rating})</span>
       </div>
        {/* open product in purchase page */}
       <Link to={`/purchase/${product.product_id}`} >
        <button className="flex items-center gap-3 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
          Buy Now
          <FaCartShopping/>
        </button>
        
        </Link>
       </div>
      </div>
    </div>
    </Suspense>
  );
}

// {product.average_rating}

export default ProductCard;

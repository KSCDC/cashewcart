import React from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
function ProductCard({id, image, name, type, description,packet_weights }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <img className="h-48 w-full object-contain" src={image} alt="Product" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-700">{description.slice(0, 50)}...</p>
       <div className="flex justify-bwtween">
        <div>
          {packet_weights.map((value) => (
            <div>
              <span>{value.weight}</span>
              <span>{value.mrp}</span>

            </div>
          ))}
        </div>
       <Link to={"/purchase"} state={{id: id}}>
       <button className='btn text-white bg-red-500 hover:bg-red-600'>
        <MdOutlineShoppingCart/>Buy Now
        </button>
       </Link>
       </div>
      </div>
    </div>
  );
}

export default ProductCard;

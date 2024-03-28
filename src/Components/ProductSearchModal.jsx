import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BACKEND_URL } from "../constants/index";
import ProductCard from "../Components/ProductCard";
import Loading from "./Loading";

function ProductSearchModal({ setShowModal }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/product/list/?search=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white p-2 rounded-lg h-[30rem] lg:w-1/2 w-96 shadow-lg overflow-scroll">
        {/* Search input */}
        <div className="flex items-center sticky top-0 bg-white z-10 gap-2">
        
          <input
            type="text"
            className="input bg-gray-200 w-full"
            placeholder="Search Product By Name...."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
          onClick={() => setShowModal(false)}
          className="p-2 text-2xl  transition duration-300 bg-red-500 hover:bg-white hover:text-red-500 text-white rounded-full"
          title="Close"
        >
          <IoMdClose />
        </button>
        </div>
        {/* Product cards or no products message */}
        <div>
          {loading ? (
            <Loading/>
          ) : data.length === 0 ? (
            <NoDatFound/>
          ) : (
            data.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function NoDatFound(){
  return(
    <div className="flex flex-col items-center justify-center">
      <img src="/404.svg" className="h-52 w-52 object-contain" alt="" />
      <p className="font-bold text-red-500">No Products Found</p>
    </div>
  )
}

export default ProductSearchModal;

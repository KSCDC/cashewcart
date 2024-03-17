import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BACKEND_URL, productData } from '../../constants'
import ProductBanner from './ProductBanner'
import { IoMdArrowRoundBack } from "react-icons/io";


function Purchase() {
  const [response,setResponse] = useState()
  const {state} = useLocation()
    useEffect(() => { 
      window.scrollTo(0,0);
      fetch(`${BACKEND_URL}/api/product/detail/${state.id}`)
        .then((data) => data.json())
        .then((response) => setResponse(response))
        .catch((err) => console.log(`Error: ${err.message}`));
    },[])
    
  

    

  return (
    <div className='min-h-screen'>
      <button className='btn bg-red-500 text-white hover:bg-red-600' onClick={() => history.back()}>
        <IoMdArrowRoundBack/> Back {state.id}
      </button>
    
        <ProductBanner  {...response} />
  
    </div>
  )
}

export default Purchase
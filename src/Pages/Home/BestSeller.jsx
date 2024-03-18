import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard'
import { BACKEND_URL } from '../../constants'
function BestSeller() {
  const [response,setResponse] = useState()
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/product/bestsellers/`)
    .then((data) => data.json())
    .then((res) => setResponse(res.results))
    .catch((err) => console.log(`Error While Fetching ${err.message}`))
  },[])

  if(!response){
    console.log("No data found")
  }
  console.log(response)
  return (
    <div className='mt-6'>
        <h3 className="text-2xl font-bold uppercase text-center">Our Best Seller</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            <ProductCard {...response}/>
        </div>
    </div>
  )
}

export default BestSeller
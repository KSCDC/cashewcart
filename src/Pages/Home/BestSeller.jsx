import React from 'react'
import { productData } from '../../constants'
import ProductCard from '../../Components/ProductCard'
function BestSeller() {
  return (
    <div className='mt-6'>
        <h3 className="text-2xl font-bold uppercase text-center">Our Best Seller</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {
                productData.slice(0,4).map((product) => (
                    <ProductCard key={product.id} {...product}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller
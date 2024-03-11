import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { productData } from '../../constants'
import ProductBanner from './ProductBanner'


function Purchase() {
    useEffect(() => { window.scrollTo(0,0)},[])
    const {state} = useLocation()
    const product = productData.filter(product => product.id === state.id)
  return (
    <div className='min-h-screen'>
        {
            product.map((data,index) => (
                <ProductBanner key={index} {...data} />
            ))
        }
    </div>
  )
}

export default Purchase
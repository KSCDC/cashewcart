import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../constants'

function useGetAllProducts() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(`${BACKEND_URL}/api/product/list/?page=3`)
            .then((data) => data.json())
            .then((res) => setProducts(res))

    }, [])
    if(products.previous){
        console.log(true)
    }
    return {products}
}

export default useGetAllProducts
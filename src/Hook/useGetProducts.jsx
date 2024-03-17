import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../constants'

function useGetProducts(endpoint) {
    const [response,setResponse] = useState([])
    useEffect(() => {
        fetch(`${BACKEND_URL}/api/product/${endpoint}/`)
        .then(data => data.json())
        .then(response => setResponse(response))
        .catch(err => console.log(`Error: ${err.message}`))
    },[])
  return response;
}

export default useGetProducts
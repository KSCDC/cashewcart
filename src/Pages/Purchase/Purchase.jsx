import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BACKEND_URL } from '../../constants'
import Loading from '../../Components/Loading'
import PurchasePage from './PurchasePage'
import Banner from "../../Components/Banner"

function Purchase() {
  const [response,setResponse] = useState([])
  const [isLoading,setIsLoading] = useState(false)
    useEffect(() => {
       // get into the top side of the page
    window.scrollTo(0,0)
    setIsLoading(true)
    fetch(`${BACKEND_URL}/api/product/detail/${state.id}/`)
    .then((res) => res.json())
    .then((data) => setResponse(data))
    .catch((err) => console.log("API CALL FAILED"))
    setIsLoading(false)
    },[])

    
    let {state} = useLocation()
    console.log(response.results)

    if(isLoading){
      return <Loading/>
    }
  return (
    <main className="min-h-screen">
        <PurchasePage {...response}/>
        <Banner image={`/banner/hero-${Math.floor(Math.random() * 5) + 1}.png`} />
    </main>
  )
}

export default Purchase
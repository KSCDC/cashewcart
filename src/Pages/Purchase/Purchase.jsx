import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../../constants'
import Loading from '../../Components/Loading'
import PurchasePage from './PurchasePage'
import Banner from "../../Components/Banner"
import BestSellers from "../Home/BestSellers"
import TrendingProducts from '../Home/TrendingProducts';
import SponsorProducts from '../Home/SponsorProducts';
import NotFound from '../../Components/NotFound';



function Purchase() {
  const [response, setResponse] = useState(null) // Initialize response state as null
  const [isLoading, setIsLoading] = useState(false)
  // state to display modal of social share
  const [isShare,setIsShare] = useState(false)
  // Extract the productId from URL parameters
  const { productId } = useParams();

  useEffect(() => {
    // get into the top side of the page
    window.scrollTo(0, 0)
    setIsLoading(true)
    // Use the productId in the API call
    fetch(`${BACKEND_URL}/api/product/detail/${productId}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setResponse(data)
      })
      .catch((err) => {
        console.log("API CALL FAILED");
        setResponse({ errors: { detail: "Not found." } }); // Set response with error object if API call fails
      })
      .finally(() => setIsLoading(false)); // Ensure setIsLoading(false) is called even if there's an error
  }, [productId]); // Add productId as dependency

  // Render conditionally based on response and isLoading states
  return (
    <main className="min-h-screen">
      {isLoading && <Loading />}
      {/* Render if response exists and it contains a valid product */}
      {!isLoading && response && !response.errors ? (
        <>
          <PurchasePage {...response}/>
          <BestSellers/>
          <Banner image={`/banner/hero-${Math.floor(Math.random() * 5) + 1}.png`} />
          <TrendingProducts/>
          <Banner image={`/banner/hero-${Math.floor(Math.random() * 5) + 1}.png`} />
          <SponsorProducts/>
        </>
      ) : (
        // Render if response is null or productId is invalid
        <div className="flex justify-center">
          <NotFound/>
        </div>
      )}
    </main>
  )
}

export default Purchase;

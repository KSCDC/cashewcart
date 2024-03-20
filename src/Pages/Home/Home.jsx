import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import Banner from '../../Components/Banner'
import BestSellers from './BestSellers'
import TrendingProducts from './TrendingProducts'

function Home() {
  return (
   <main>
    <FeaturedProducts/>
    <Banner image={"/banner/hero-1.png"}/>
    <BestSellers/>
    <Banner image={"/banner/hero-2.png"}/>
    <TrendingProducts/>
   </main>
  )
}

export default Home
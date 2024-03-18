import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import Banner from '../../Components/Banner'
import BestSellers from './BestSellers'

function Home() {
  return (
   <main>
    <FeaturedProducts/>
    <Banner image={"/banner/hero-1.png"}/>
    <BestSellers/>
    <Banner image={"/banner/hero-2.png"}/>
   </main>
  )
}

export default Home
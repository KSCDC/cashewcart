import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import Banner from '../../Components/Banner'

function Home() {
  return (
   <main>
    <FeaturedProducts/>
    <Banner image={"/banner/hero-1.png"}/>
   </main>
  )
}

export default Home
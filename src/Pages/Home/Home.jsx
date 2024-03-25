import React from 'react';
import FeaturedProducts from './FeaturedProducts';
import Banner from '../../Components/Banner';
import BestSellers from './BestSellers';
import TrendingProducts from './TrendingProducts';
import SponsorProducts from './SponsorProducts';

function Home() {
  return (
    <main>
      <FeaturedProducts />
      <Banner image={"/banner/hero-1.png"} />
      <BestSellers />
      <Banner image={"/banner/hero-2.png"} />
      <TrendingProducts />
      <Banner image={"/banner/hero-3.png"} />
      <SponsorProducts />
    </main>
  );
}

export default Home;

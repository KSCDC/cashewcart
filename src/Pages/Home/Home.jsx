import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../constants";
import ProductCard from "../../Components/ProductCard";
import HomeBanner from "./HomeBanner";
import BestSeller from "./BestSeller";

export default function Home() {
  const [response, setResponse] = useState({ results: [] });

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/product/list/`)
      .then((data) => data.json())
      .then((response) => setResponse(response))
      .catch((err) => console.log(`Error: ${err.message}`));
  }, []);

  response.results.map((data) => {
    console.log(data.product.product_images[0].product_image
      )
  })
  return (
    <main>
      <h3 className="text-3xl font-bold text-center mt-6 uppercase">
        Explore Our Products
      </h3>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {response.results &&
          response.results.map((data, index) => (
            <ProductCard 
            key={index} 
            id={data.product.id}
            name={data.product.name}
            description={data.product.description}
            image={data.product.product_images[0].product_image}
            />
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="btn border border-red-500 hover:bg-red-500 hover:text-white  text-red-500">
          View More..
        </button>
      </div>
      {/* home page contents */}
      <HomeBanner imageNumber={1} />
      <BestSeller/>
      <div className="p-3">
        <div className="lg:flex w-full gap-3">
          <div className="rounded-xl shadow-2xl overflow-hidden">
            <div className="home-banner-wrapper relative">
              <HomeBanner imageNumber={1} />
            </div>
          </div>
          <div className="rounded-xl shadow-2xl mt-2 overflow-hidden">
            <div className="home-banner-wrapper relative">
              <HomeBanner imageNumber={2} />
            </div>
          </div>
        </div>

        <div className="lg:flex w-full gap-3 mt-3">
          <div className="rounded-xl shadow-2xl overflow-hidden">
            <div className="home-banner-wrapper relative">
              <HomeBanner imageNumber={3} />
            </div>
          </div>
          <div className="rounded-xl shadow-2xl mt-2 overflow-hidden">
            <div className="home-banner-wrapper relative">
              <HomeBanner imageNumber={4} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

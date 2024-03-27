import React, { useEffect, useState } from 'react';
import ProductCard from '../../Components/ProductCard';
import { BACKEND_URL } from '../../constants';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Loading from '../../Components/Loading';

function FeaturedProducts() {
    const [products, setProducts] = useState({ results: [] });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        setLoading(true); // Set loading to true when fetching data
        fetch(`${BACKEND_URL}/api/product/list/?page=${page}`)
            .then((data) => data.json())
            .then((res) => {
                // Filter out products with the same name
                const uniqueProducts = res.results.filter((product, index, self) =>
                    index === self.findIndex((p) => (
                        p.product.name === product.product.name
                    ))
                );
                setProducts({ ...res, results: uniqueProducts });
                setLoading(false); // Set loading to false after data is fetched
            });
    }, [page]);

    const goToPrevPage = () => {
        if (products.previous) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        if (products.next) {
            setPage(page + 1);
        }
    };

    return (
        <main className="min-h-screen">
            <h3 className="text-3xl font-bold text-center m-3 uppercase">Our Featured Products</h3>
            <div className="flex items-center justify-center gap-3">
                <button
                    className={`p-3 hover:bg-red-500 hover:text-white rounded-full border ${!products.previous ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'border-red-500'}`}
                    onClick={goToPrevPage}
                    disabled={!products.previous}>
                    <FaArrowLeft />
                </button>
                <button
                    className={`p-3 rounded-full border ${!products.next ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'border-red-500'}`}
                    onClick={goToNextPage}
                    disabled={!products.next}>
                    <FaArrowRight />
                </button>
            </div>
            {loading ? (
                <Loading /> // Show loading message while fetching data
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                    {showMore ? (
                        products.results.map((product) => (
                            <ProductCard 
                            key={product.product_variant_id} 
                            {...product} />
                        ))
                    ) : (
                        products.results.slice(0, 4).map((product,index) => (
                            <ProductCard key={index} {...product} />
                        ))
                    )}
                </div>
            )}
            <div className="mt-4 flex justify-center">
                <button onClick={() => setShowMore((prev) => !prev)} className='px-12 bg-red-500 py-3 font-bold text-white hover:bg-red-600 rounded-lg'>
                    {showMore ? "Show Less" : "Show More"}
                </button>
            </div>
        </main>
    );
}

export default FeaturedProducts;

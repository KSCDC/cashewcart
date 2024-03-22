import React, { Suspense, useEffect, useState } from 'react';
import { BACKEND_URL } from '../../constants';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Loading from '../../Components/Loading';
import { Link } from 'react-router-dom';
import { IoStarSharp } from "react-icons/io5";
import { FaCartShopping } from 'react-icons/fa6';


function TrendingProducts() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const [showMore, setShowMore] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(`${BACKEND_URL}/api/product/trending/?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.results);
                setHasPrevious(!!data.previous);
                setHasNext(!!data.next);
                setLoading(false)
            })
            .catch((err) => console.log(`Error: ${err.message}`));
    }, [page]);

    const goToPrevPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const goToNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <main>
            <div className="flex items-center justify-center gap-3">
                <button
                    className={`p-3 hover:bg-red-500 hover:text-white rounded-full border ${!hasPrevious ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'border-red-500'}`}
                    onClick={goToPrevPage}
                    disabled={!hasPrevious}>
                    <FaArrowLeft />
                </button>
                <button
                    className={`p-3 rounded-full border ${!hasNext ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'border-red-500'}`}
                    onClick={goToNextPage}
                    disabled={!hasNext}>
                    <FaArrowRight />
                </button>
            </div>
            <h3 className="text-center text-3xl font-bold uppercase">Our Trending Products</h3>
            {
                loading ? <Loading /> : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                        {showMore ? (

                            products.map((data, index) => (
                                <TrendingProductCard
                                    key={index}
                                    id={data.product.product.product_id}
                                    name={data.product.product.name}
                                    description={data.product.product.description}
                                    image={data.product.product.product_images[0].product_image}
                                    selling_price={data.product.selling_price}
                                    rating={data.product.product.average_rating}

                                />
                            ))
                        ) : (
                            products.slice(0, 8).map((data, index) => (
                                <TrendingProductCard
                                    key={index}
                                    name={data.product.product.name}
                                    description={data.product.product.description}
                                    image={data.product.product.product_images[0].product_image}
                                    selling_price={data.product.selling_price}
                                    id={data.product.product.product_id}
                                    rating={data.product.product.average_rating}


                                />
                            ))
                        )}
                    </div>
                )
            }

            <div className="mt-4 flex justify-center">
                <button onClick={() => setShowMore((prev) => !prev)} className='px-12 bg-red-500 py-3 font-bold text-white hover:bg-red-600 rounded-lg'>
                    {showMore ? "Show Less" : "Show More"}
                </button>
            </div>
        </main>
    );
}

const TrendingProductCard = ({ name, description, image, selling_price, id, rating }) => {
    return (
        <Suspense fallback={<Loading />}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                    className="w-full h-72 object-contain"
                    src={`${BACKEND_URL}${image}`}
                    alt="Product Primary Image"
                />
                <div className="p-6">
                    <h3 className="text-gray-900 font-semibold text-xl mb-2">{name}</h3>
                    <p className="text-gray-700 text-base mb-4">{description.slice(0, 72)}...</p>
                    <p className="text-red-500 text-xl font-semibold">₹{selling_price}</p>
                    <div className="flex items-center justify-between">
                        {/* product rating */}
                        <div className="flex items-center text-yellow-400">
                            {Array.from({ length: rating }).map((_, index) => (
                                <IoStarSharp key={index} className='text-lg' />
                            ))}
                            <span className='text-black'>({rating})</span>
                        </div>
                        {/* open product in purchase page */}
                        <Link to="/purchase" state={{ id: id }}>
                            <button className="flex items-center gap-3 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
                                Buy Now
                                <FaCartShopping />
                            </button>

                        </Link>
                    </div>
                </div>
            </div>
        </Suspense>


    );
};

export default TrendingProducts;

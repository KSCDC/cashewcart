import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../constants';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Loading from '../../Components/Loading';

function BestSellers() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const [showMore,setShowMore] = useState(false)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(`${BACKEND_URL}/api/product/bestsellers/?page=${page}`)
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
            <h3 className="text-center text-3xl font-bold uppercase">Our Best Sellers</h3>
            {
                loading ? <Loading/> : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                    {showMore ? (
                        
                        products.map((data, index) => (
                            <BestSellerCard
                                key={index}
                                name={data.product.product.name}
                                description={data.product.product.description}
                                image={data.product.product.product_images[0].product_image}
                            />
                        ))
                    ) : (
                        products.slice(0, 4).map((data, index) => (
                            <BestSellerCard
                                key={index}
                                name={data.product.product.name}
                                description={data.product.product.description}
                                image={data.product.product.product_images[0].product_image}
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

const BestSellerCard = ({ name, description, image }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
                className="w-full h-72 object-contain"
                src={`${BACKEND_URL}${image}`}
                alt="Product Primary Image"
            />
            <div className="p-6">
                <h3 className="text-gray-900 font-semibold text-xl mb-2">{name}</h3>
                <p className="text-gray-700 text-base mb-4">{description.slice(0, 72)}...</p>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
                    Show More
                </button>
            </div>

        
        </div>
    );
};

export default BestSellers;

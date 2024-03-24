import React, { useEffect, useState } from 'react';
import useAuthStatus from '../../Hooks/useAuthStatus';
import { BACKEND_URL } from "../../constants/index";
import { useNavigate } from 'react-router-dom';
import { IoStarSharp, IoClose} from "react-icons/io5";

const Review = ({ product_id, average_rating }) => {
  const navigate = useNavigate();
  const [productReview, setProductReview] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useAuthStatus();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/product/reviews/${product_id}/list/`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setProductReview(data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    fetchReviews();
  }, [product_id, navigate]);

  const handleModalClose = () => {
    setShowModal(false);
    alert('Clicked')
  };

  const ReviewModal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-8 max-w-md w-full z-50">
        <h2 className="text-lg font-bold mb-4">Write a Review</h2>
        <form>
          <div className="rating rating-lg">
            {/* Your rating input elements go here */}
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block text-gray-700 font-bold mb-2">Review:</label>
            <textarea id="review" name="review" className="w-full border border-gray-300 rounded-md p-2" rows="5"></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={handleModalClose} type="button" className="bg-white border-red-500  text-red-500 hover:text-white hover:bg-red-500 font-bold flex items-center btn">
              <IoClose />
              Close
            </button>
            <button  className="bg-red-500 hover:bg-red-600 text-white font-bold btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <main>
      <div className="grid gap-2 lg:flex items-center justify-between">
        <h3 className='uppercase font-bold text-xl lg:text-2xl'>Customer Review & rating</h3>
        {isLoggedIn && (
          <div>
            <button onClick={() => setShowModal(true)} className='btn px-16 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'>Write review</button>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className='flex flex-col items-center'>
          <h2 className='text-2xl font-bold'>{average_rating}.0</h2>
          <Stars count={average_rating} />
          <p className='font-bold'>Customer Rating</p>
        </div>
      </div>
      <div className="flex flex-col items-start">
        {productReview.map((data) => (
          <ReviewTemplate
            key={data.id} // Assuming each review has a unique ID
            user={data.user_name}
            review={data.review_text}
            stars={data.stars}
            date={data.created_at}
          />
        ))}
      </div>
      {showModal ? <ReviewModal /> : null}
    </main>
  );
};

const ReviewTemplate = ({ user, review, stars, date }) => {
  const formatDate = (dateString) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className='mt-3'>
      <h3 className='font-bold'>{user}</h3>
      <p className='max-w-2xl mt-2 mb-2'>{review}</p>
      <h3 className='text-gray-500 italic mt-2 mb-2'>{formatDate(date)}</h3>
      <Stars count={stars} />
    </div>
  );
};

const Stars = ({ count }) => (
  <div className='flex items-center text-xl text-yellow-400'>
    {Array.from({ length: count }, (_, index) => (
      <IoStarSharp key={index} />
    ))}
  </div>
);

export default Review;

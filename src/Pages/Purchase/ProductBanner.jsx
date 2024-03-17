import { useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../constants";

const productReview = [
  {
    id: 1,
    name: "Joe",
    review: "Great product! I love it."
  },
  {
    id: 2,
    name: "Sarah",
    review: "Amazing quality! Definitely worth the price."
  },
  {
    id: 3,
    name: "Michael",
    review: "This product exceeded my expectations. Very satisfied."
  },
  {
    id: 4,
    name: "Emily",
    review: "I'm impressed with the performance of this product."
  },
  {
    id: 5,
    name: "David",
    review: "Highly recommend this product to everyone!"
  },
  {
    id: 6,
    name: "Sophia",
    review: "Such a useful product. Can't imagine life without it now."
  },
  {
    id: 7,
    name: "Daniel",
    review: "Excellent product! It's exactly what I needed."
  }
];

function ProductBanner({
  name,
  // image,
  // second_image,
  description,
  product_images,
  // rating,
  // packet_weights,
  // speciality
}) {
  const [mainImage, setMainImage] = useState(product_images[0].product_image);
  // const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [userReview, setUserReview] = useState("");

  const handleImageClick = (clickedImage) => {
    setMainImage(clickedImage);
  };

  // const handlePriceSelect = (index) => {
  //   setSelectedPriceIndex(index);
  // };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleReviewChange = (event) => {
  //   setUserReview(event.target.value);
  // };

  // const handleSubmitReview = () => {
  //   // Here you can implement logic to submit the user review
  //   console.log("User review submitted:", userReview);
  //   // Close the modal after submitting the review
  //   closeModal();
  // };

  return (
    <div>
      <main className="grid lg:flex gap-4 p-4">
        {/* first section alternative images */}
        <div className="flex lg:flex-col gap-2">
          <button onClick={() => handleImageClick(product_images[0].product_image)} className="border rounded-lg border-red-500">
            <img
              src={`${BACKEND_URL}${product_images[0].product_image}`}
              className="h-44 object-contain w-44"
              alt="product image"
            />
          </button>
          <button onClick={() => handleImageClick(product_images[1].product_image)} className="border rounded-lg border-red-500">
            <img
            src={`${BACKEND_URL}${product_images[1].product_image}`}
              className="h-44 object-contain w-44"
              alt={product_images[0].product_image}
            />
          </button>
          <button onClick={() => handleImageClick(product_images[2].product_image)} className="border rounded-lg border-red-500">
            <img
            src={`${BACKEND_URL}${product_images[2].product_image}`}
              className="h-44 object-contain w-44"
              alt={product_images[0].product_image}
            />
          </button>
        </div>
        {/* second section full height banner image */}
        <div className="lg:flex items-start">
          <img
            src={`${BACKEND_URL}${mainImage}`}
            className="lg:h-screen lg:w-1/2 w-full object-contain hover:scale-150 transition duration-700"
            alt="product image"
          />
          {/* third section display the product name and details */}
          <div className="max-w-xl">
            <h3 className="text-4xl font-bold">{name}</h3>
            {/* <div className="flex items-center gap-1">
              <span className="font-bold">Rating: </span>
              {Array.from({ length: rating }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div> */}
            {/* <div className="flex mt-3 items-center gap-x-3">
              {packet_weights.map((packet, index) => (
                <button
                  key={index}
                  className={`${
                    index === selectedPriceIndex
                      ? "bg-red-500 text-white"
                      : "bg-transparent text-red-500 border border-red-500"
                  } px-4 py-2 rounded-full`}
                  onClick={() => handlePriceSelect(index)}
                >
                  ₹{packet.mrp} - {packet.weight}
                </button>
              ))}
            </div> */}
            <h4 className="text-lg tracking-wide mt-6">{description}</h4>
            {/* <hr className="mt-6 border border-b-black" /> */}
            {/* <div className="mt-6">
              <Link
                to="/cart"
                className="btn bg-red-500 hover:bg-red-400 text-white w-full"
              >
                Add to cart
              </Link>
              <h2 className="mt-4 font-semibold">Specialties</h2>
              <ul>
                {speciality.map((spec, index) => (
                  <li className="list-disc" key={index}>
                    {spec}
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </main>
      {/* section for product review */}
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-bold mb-4">Top Reviews</h2>
        {/* <button onClick={openModal} className="btn bg-red-500 hover:bg-red-600 text-white">Write Review</button> */}
        {/* write review modal */}
        {/* {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={closeModal}></div>
            <div className="bg-white p-6 rounded-lg z-50">
              <h3 className="text-xl font-bold mb-4">Write Your Review</h3>
              <textarea
                className="w-full h-24 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Write your review..."
                value={userReview}
                onChange={handleReviewChange}
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button onClick={handleSubmitReview} className="btn bg-red-500 hover:bg-red-600 text-white">Submit</button>
                <button onClick={closeModal} className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 ml-2">Cancel</button>
              </div>
            </div>
          </div>
        )} */}
        {/* end write review modal */}
        {/* <div className="grid gap-6">
          {productReview.map((review) => (
            <ReviewCard key={review.id} review={review} rating={rating} />
          ))}
        </div> */}
      </div>
    </div>
  );
}

function ReviewCard({ review, rating }) {
  return (
    <div className="bg-white rounded-lg mt-4">
      <div className="flex items-center mb-2">
        <div className="">
          <h3 className="text-lg font-semibold">{review.name}</h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }).map((_, index) => (
              <StarIcon key={index} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700">{review.review}</p>
      <p className="text-red-500 font-bold">24 October 2023</p>
    </div>
  );
}

function StarIcon() {
  return <IoStarSharp className="text-yellow-300 text-xl" />;
}

export default ProductBanner;

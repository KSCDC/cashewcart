import { useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function ProductBanner({
  name,
  image,
  second_image,
  description,
  rating,
  packet_weights,
  speciality
}) {
  const [mainImage, setMainImage] = useState(image);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);

  const handleImageClick = (clickedImage) => {
    setMainImage(clickedImage);
  };

  const handlePriceSelect = (index) => {
    setSelectedPriceIndex(index);
  };

  return (
    <main className="grid lg:flex gap-4 p-4">
      {/* first section alternative images */}
      <div className="flex lg:flex-col gap-2">
        <img
          src={image}
          onClick={() => handleImageClick(image)}
          className="h-44 object-contain w-44 border cursor-pointer"
          alt="product image"
        />
        <img
          src={second_image}
          onClick={() => handleImageClick(second_image)}
          className="h-44 object-contain w-44 border cursor-pointer"
          alt="product image"
        />
      </div>
      {/* second section full height banner image */}
      <div className="lg:flex items-start">
        <img
          src={mainImage}
          className="lg:h-screen lg:w-1/2 w-full object-contain"
          alt="product image"
        />
        {/* third section display the product name and details */}
        <div className="max-w-xl">
          <h3 className="text-4xl font-bold">{name}</h3>
          <div className="flex items-center gap-1">
            <span className="font-bold">Rating: </span>
            {Array.from({ length: rating }).map((_, index) => (
              <StarIcon key={index} />
            ))}
          </div>
          <div className="flex mt-3 items-center gap-x-3">
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
          </div>
          <h4 className="text-lg tracking-wide mt-6">{description}</h4>
          <hr className="mt-6 border border-b-black" />
          <div className="mt-6">
            <Link
              to="/cart"
              className="btn bg-red-500 hover:bg-red-400 text-white w-full"
            >
              Buy Now
            </Link>
            <h2 className="mt-4 font-semibold">Speciliaties</h2>
            <ul>
              {speciality.map((spec) => (
                <li className="list-disc" key={spec}>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

function StarIcon() {
  return <IoStarSharp className="text-yellow-300 text-xl" />;
}

export default ProductBanner;

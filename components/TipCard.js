import React from "react";

function TipCard({ title, description, imageSrc, onClick }) {
  return (
    <div className="w-full">
    <div className="bg-white rounded-lg shadow-md  m-2 ">
      <div className="bg-blue-500 rounded-t-lg mb-1">
        <img
          src={imageSrc}
          alt={title}
          className="w-full p-6 h-48 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-6 flex justify-center text-center">
        <div className="text-center">
          <h2 className="text-lg text-black font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">{description}</p>
          <span className="text-black hover:bg-green-700 font-bold border-b-4 border-r-4 border-green-500 rounded">
            <button
              className="text-black border hover:bg-green-700 font-bold px-4 rounded"
              onClick={onClick}
            >
              Read More
            </button>
          </span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default TipCard;

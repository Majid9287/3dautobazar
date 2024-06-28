import React, { useState, useRef, useEffect } from "react";

function TipCard({ title, description, imageSrc }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const contentRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setShowButton(contentRef.current.scrollHeight > contentRef.current.clientHeight);
    }
  }, [description]); 

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md m-2 relative">
        <div className="bg-blue-500 rounded-t-lg mb-1">
          <img src={imageSrc} alt={title} className="w-full  p-6 h-48 object-cover rounded-t-lg rounded-full" />
        </div>
        <div className="p-6 flex justify-center text-center relative">
          <div className="text-center">
            <h2 className="text-lg text-black font-semibold mb-2">{title}</h2>
            <p
              ref={contentRef}
              className={`text-gray-600 mb-2 ${
                !showFullDescription ? "line-clamp-4" : ""
              }`}
            >
              {description}
            </p>

            {showButton && (
              <span
                className=" bottom-4 left-1/2 transform -translate-x-1/2 text-black hover:bg-green-700 font-bold border-b-4 border-r-4 border-green-500 rounded cursor-pointer"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Hide" : "Read More"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TipCard;


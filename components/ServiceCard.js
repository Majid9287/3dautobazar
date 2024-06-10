import { FaLongArrowAltRight } from "react-icons/fa";
import styles from "@/styles/Color.module.css";
const Card = ({ title, description, imageSrc }) => (
  <div className="w-full md:w-1/5">
    <div className={` rounded-lg   m-2  ${styles.gradientBg2}`}>
      <div className="rounded-t-lg mb-1">
        <img
          src={imageSrc}
          alt={title}
          className="w-full p-6 h-48 object-contain rounded-t-lg"
        />
      </div>
      <div className="p-2 flex justify-center text-center">
        <div className="text-center">
          <h2 className="text-lg text-black font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">{description}</p>
          <span className="text-black flex justify-center font-bold border-green-500 rounded">
            <FaLongArrowAltRight className="text-5xl font-bold" />
          </span>
        </div>
      </div>
    </div>
  </div>
);
export default Card;

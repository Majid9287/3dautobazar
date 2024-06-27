import { useState, useEffect, useRef } from "react";
import { FaSort, FaFilter } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import styles from "@/styles/Color.module.css";
import CarCard from "../components/CarCard";
import CarCardSkeleton from "../components/CarCardSkeleton";
export default function Home() {
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ads");
        const data = await response.json();
        setCars(data.ads);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className={` text-gray-700 py-20 ${styles.gradientBg3}`}>
        <div className="container pt-8 mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-2">Find Your Dream Car</h1>
          <p className="text-xl mb-8">
            Browse through thousands of car listings
          </p>
          <div className="flex justify-center items-center max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search for cars..."
              className="w-full p-3 rounded-l-lg focus:outline-none"
            />
            <button className="bg-blue-500 p-3 rounded-r-lg text-white">
              <FiSearch size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Sort Options */}
      <section className="container mx-auto px-6 my-10 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-2"
            onClick={() => setFilterOption("")}
          >
            <FaFilter size={24} />
            <span>Filter</span>
          </button>
          <select
            className="p-3 rounded-lg shadow-md"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="yearAsc">Year (Old to New)</option>
            <option value="yearDesc">Year (New to Old)</option>
          </select>
        </div>
      </section>

      {/* Car Ad Cards */}
      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {cars && cars.length > 0
          ? cars.map((car) => <CarCard key={car.adId} car={car} />)
          : Array.from({ length: 8 }).map((_, index) => (
              <CarCardSkeleton key={index} />
            ))}
      </section>
    </div>
  );
}

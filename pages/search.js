import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaSort, FaFilter } from "react-icons/fa";
import styles from "@/styles/Color.module.css";
import { FaRegSadCry } from "react-icons/fa";
import CarCard from "../components/CarCard";
import CarCardSkeleton from "../components/CarCardSkeleton";

const Cars = ["Suzuki", "Toyota", "Honda"];
const years = ["2020", "2021", "2022", "2023"];
const colors = ["Red", "Blue", "Green", "Black", "White"];

export default function Home() {
  const router = useRouter();
  const { query } = router;
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [cars, setCars] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (query.q) {
      setSearchQuery(query.q);
    }
  }, [query]);

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleCancel = () => {
    setSelectedCar('');
    setSelectedYear('');
    setSelectedColor('');
    setShowFilters(false);
  };

  const handleApply = () => {
    const filters = {};
    if (selectedCar) filters.carModel = selectedCar;
    if (selectedYear) filters.carRegYear = selectedYear;
    if (selectedColor) filters.carColor = selectedColor;
    if (searchQuery) filters.q = searchQuery;

    router.push({
      pathname: '/search',
      query: { ...filters }
    });
    setShowFilters(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(query).toString();
        const response = await fetch(`/api/search?${queryParams}`);
        const data = await response.json();
        setCars(data.ads);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className={`text-gray-700 ${styles.gradientBg3}`}>
        <div className="container mx-auto flex justify-center content-center text-center">
          <img src="/images/search.png" alt="Respond to Inquiries" className="" />
        </div>
      </section>

      {/* Filter and Sort Options */}
      <section className="container mx-auto px-6 my-10 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className="bg-white p-3 rounded-lg shadow-md flex items-center space-x-2"
            onClick={handleFilterToggle}
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
        {showFilters && (
          <div className="absolute top-16 bg-white shadow-lg rounded-lg p-5 w-full md:w-1/2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="car" className="font-semibold">Car</label>
                <select id="car" className="border rounded p-2" value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
                  <option value="">Select Car</option>
                  {Cars.map((car) => (
                    <option key={car} value={car}>{car}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="year" className="font-semibold">Year</label>
                <select id="year" className="border rounded p-2" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="color" className="font-semibold">Color</label>
                <select id="color" className="border rounded p-2" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                  <option value="">Select Color</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button className="px-4 py-2 border rounded bg-gray-200" onClick={handleCancel}>Cancel</button>
                <button className="px-4 py-2 border rounded bg-blue-600 text-white" onClick={handleApply}>Apply</button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Car Ad Cards */}
      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))
        ) : cars && cars.length > 0 ? (
          cars.map((car) => <CarCard key={car.adId} car={car} />)
        ) : (
          <div className="col-span-1 md:col-span-4 flex justify-center items-center text-center text-gray-500">
          <div className="flex flex-col items-center">
            No data available.
            <FaRegSadCry className="text-8xl"/>
          </div>
        </div>
        
        )}
      </section>
    </div>
  );
}

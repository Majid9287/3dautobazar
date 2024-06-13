import { useState } from 'react';
import { FaSort, FaFilter } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

export default function Home() {
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-2">Find Your Dream Car</h1>
          <p className="text-xl mb-8">Browse through thousands of car listings</p>
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
            onClick={() => setFilterOption('')}>
            <FaFilter size={24} />
            <span>Filter</span>
          </button>
          <select
            className="p-3 rounded-lg shadow-md"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort By</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="yearAsc">Year (Old to New)</option>
            <option value="yearDesc">Year (New to Old)</option>
          </select>
        </div>
      </section>

      {/* Car Ad Cards */}
      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((car) => (
          <div key={car} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <img
              src={`https://via.placeholder.com/400x300?text=Car+${car}`}
              alt={`Car ${car}`}
              className="rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">Car Model {car}</h2>
            <p className="text-gray-700 mb-4">Description of Car {car}</p>
            <button className="bg-blue-500 text-white p-3 rounded-lg mt-auto">
              View Details
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

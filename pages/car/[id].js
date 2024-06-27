import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CarDetailsSkeleton from "../../components/CarDetailsSkeleton";
import {
  FaPhone,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaTimes,
} from "react-icons/fa";
import Modal from "react-modal";

export default function CarDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (id) {
        try {
          const response = await fetch(`/api/ads-details?adId=${id}`);
          const data = await response.json();
          if (data) {
            setCar(data.ad);
            setUser(data.user);
            setLoading(false)
          } else {
            console.error("not found");
            setLoading(false)
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [router.query, id]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + car?.images?.length) % car?.images?.length
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car?.images?.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 
  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      {loading ? (
        <CarDetailsSkeleton />
      ) : (
        car && (
          <section className="container mx-auto md:px-6 px-1 py-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative space-y-4">
                  <img
                    src={car.images[currentImageIndex]}
                    alt={`Car Image ${currentImageIndex + 1}`}
                    className="rounded-lg"
                  />
                  <div className="flex justify-between w-full px-4">
                    <button
                      onClick={prevImage}
                      className="bg-gray-800 text-white p-2 rounded-full"
                    >
                      <FaChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="bg-gray-800 text-white p-2 rounded-full"
                    >
                      <FaChevronRight size={24} />
                    </button>
                  </div>
                  <button
                    onClick={openModal}
                    className="right-4 bg-gray-800 text-white p-2 rounded-full"
                  >
                    <FaExpand size={24} />
                  </button>
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Image Modal"
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
                  >
                    <div className="relative">
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 bg-white text-black p-2 rounded-full"
                      >
                        <FaTimes size={24} />
                      </button>
                      <img
                        src={car.images[currentImageIndex]}
                        alt={`Car Image ${currentImageIndex + 1}`}
                        className="rounded-lg"
                      />
                    </div>
                  </Modal>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-4">
                    {car.carMake} {car.carModel} {car.carColor} {car.carCurrentLocation}
                  </h1>
                  <div className="text-2xl font-semibold mb-4">{car.carPrice}</div>
                  <table className="table-auto w-full mb-6">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Ad Date</td>
                        <td className="border px-4 py-2">{car.adDate}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Color</td>
                        <td className="border px-4 py-2">{car.carColor}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Current Location</td>
                        <td className="border px-4 py-2">{car.carCurrentLocation}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">KM Driven</td>
                        <td className="border px-4 py-2">{car.carKMDriven}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Make</td>
                        <td className="border px-4 py-2">{car.carMake}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Model</td>
                        <td className="border px-4 py-2">{car.carModel}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Price</td>
                        <td className="border px-4 py-2">{car.carPrice}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Registration Year</td>
                        <td className="border px-4 py-2">{car.carRegYear}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Registered Location</td>
                        <td className="border px-4 py-2">{car.carRegisteredLocation}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => router.push(`/3d-view/${id}`)}
                    className="bg-blue-500 text-white p-3 rounded-lg mb-4"
                  >
                    View in 3D
                  </button>
                  <h2 className="text-2xl font-bold mb-4">Contact Seller</h2>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={user?.profilePicture}
                      alt="Owner Image"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{user?.username}</h3>
                      <div className="flex items-center space-x-2">
                        <FaEnvelope size={16} className="text-gray-700" />
                        <span className="text-gray-700">{user?.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaPhone size={16} className="text-gray-700" />
                        <span className="text-gray-700">{user?.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-green-500 text-white p-3 rounded-lg mr-2">Call</button>
                  <button className="bg-blue-500 text-white p-3 rounded-lg">Chat</button>
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </div>
  );
}

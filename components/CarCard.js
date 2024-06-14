import Link from 'next/link';

const CarCard = ({ car }) => {
  return (
    <div className="group my-2 rounded-lg flex w-full md:max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
      <a className="relative flex h-60 overflow-hidden" href="#">
        <img
          className="absolute top-0 rounded-lg right-0 h-full w-full object-cover"
          src={car.coverPhoto}
          alt={car.carMake}
        />
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-bold tracking-tight text-slate-900">
            {car.adTitle}
          </h5>
        </a>
        <div className="mt-2 flex items-center justify-between">
          <p>
            <span className="text-sm text-slate-900">
              PKR: {car.carPrice}
            </span>
          </p>
        </div>
        <h5 className="text-xl tracking-tight text-slate-900">
          {car.carCurrentLocation}
        </h5>
      </div>
      <div className="flex justify-center mb-4">
        <Link href={`/car/${car.adId}`} className="bg-blue-500 text-white p-3 rounded-lg mt-auto">
            View Details
         
        </Link>
      </div>
    </div>
  );
};

export default CarCard;

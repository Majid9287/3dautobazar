import { TbView360Number } from "react-icons/tb";

const Skeleton = () => (
  <div className="container min-h-screen mx-auto md:px-6 px-1 py-10 flex justify-center items-center">
    <div className="w-32 h-32 perspective">
      <div className="preserve-3d relative w-full h-full animate-spin-slow">
        <div className="absolute inset-0 bg-green-100 rounded-full transform-style-3d">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-blue-600 to-green-100 animate-gradient rounded-full"></div>
        </div>
        <div className="absolute inset-0 bg-green-300 transform rotate-x-90 rounded-full"></div>
        <div className="absolute inset-0 bg-green-200 transform rotate-y-90 rounded-full"></div>
        <div className="absolute inset-0 bg-green-600 transform rotate-y-180 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          <TbView360Number className="text-5xl" />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;
